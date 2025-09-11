import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssetService, AssetRequest } from '../../services/assets.service';
import { Category, Type } from '../../model/asset.model';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-asset.html',
  styleUrls: ['./add-asset.css']
})
export class AddAssetComponent implements OnInit {
  assetForm: FormGroup;
  categories: Category[] = [];
  types: Type[] = [];
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private router: Router,
    private toast: ToastService
  ) {
    this.assetForm = this.fb.group({
      assetName: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      assetDescription: [''],
      categoryId: [null, [Validators.required]],
      typeId: [null, [Validators.required]],
      allStock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadTypes();
  }

  loadCategories(): void {
    this.assetService.getCategories().subscribe(data => this.categories = data);
  }

  loadTypes(): void {
    this.assetService.getTypes().subscribe(data => this.types = data);
  }

  onSubmit(): void {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    }
    
    this.errorMessage = null;

    const formValue = this.assetForm.value;
    const assetData: AssetRequest = {
      ...formValue,
      numberOfAvailableToAssign: formValue.allStock,
      numberOfMaintenance: 0,
      numberOfRetired: 0
    };

    this.assetService.addAsset(assetData).subscribe({
      next: () => {
        this.toast.success('Asset added successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to add asset. Please try again.';
        if (this.errorMessage) {
          this.toast.error(this.errorMessage);
        }
        console.error(err);
      }
    });
  }
}
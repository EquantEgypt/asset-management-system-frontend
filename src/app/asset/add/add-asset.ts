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
  showStockValidation = false;
  formValue: any = {};

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
      allStock: [0, [Validators.required, Validators.min(0)]],
      numberOfAvailableToAssign: [0, [Validators.required, Validators.min(0)]],
      numberOfMaintenance: [0, [Validators.required, Validators.min(0)]],
      numberOfRetired: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadTypes();
    this.updateFormValue();
  }

  onStockChange(): void {
    this.updateFormValue();
    this.showStockValidation = true;
  }

  updateFormValue(): void {
    this.formValue = this.assetForm.value;
  }

  isStockValid(): boolean {
    const totalCalculated = (this.formValue?.numberOfAvailableToAssign || 0) + 
                           (this.formValue?.numberOfMaintenance || 0) + 
                           (this.formValue?.numberOfRetired || 0);
    return totalCalculated === (this.formValue?.allStock || 0);
  }

  loadCategories(): void {
    this.assetService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => {
        console.error('Error loading categories:', err);
        this.toast.error('Failed to load categories');
      }
    });
  }

  loadTypes(): void {
    this.assetService.getTypes().subscribe({
      next: (data) => this.types = data,
      error: (err) => {
        console.error('Error loading types:', err);
        this.toast.error('Failed to load types');
      }
    });
  }

  onSubmit(): void {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    }
    
    const formValue = this.assetForm.value;
    const totalCalculated = formValue.numberOfAvailableToAssign + formValue.numberOfMaintenance + formValue.numberOfRetired;

    if (totalCalculated !== formValue.allStock) {
        this.errorMessage = "The sum of available, maintenance, and retired assets must equal the total stock.";
        return;
    }

    this.errorMessage = null;

    const assetData: AssetRequest = this.assetForm.value;
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
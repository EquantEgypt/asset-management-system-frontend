import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssetService } from '../../services/assets.service';
import { CategoryService } from '../../services/category.service';
import { TypeService } from '../../services/assetType.service';
import { AssetRequest } from '../../model/asset.model';
import { ToastService } from 'angular-toastify';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Category } from '../../model/categoryModel';
import { Type } from '../../model/AssetTypeModel';

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
  isLoading = false;

  private destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private router: Router,
    private toast: ToastService
  ) {
    this.assetForm = this.fb.group({
      assetName: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      assetDescription: [''],
      categoryId: [null, [Validators.required]],
      typeId: [null, [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadTypes();
  }

  loadCategories(): void {
    this.categoryService.getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef)) 
      .subscribe(data => this.categories = data);
  }

  loadTypes(): void {
    this.typeService.getTypes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.types = data);
  }

  onSubmit(): void {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = null;

    const assetData: AssetRequest = this.assetForm.value; 

    this.assetService.addAsset(assetData).subscribe({
      next: () => {
        this.isLoading = false; 
        this.toast.success('Asset added successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to add asset. Please try again.';
        if (this.errorMessage) {
          this.toast.error(this.errorMessage);
        }
        console.error(err);
      }
    });
  }
}
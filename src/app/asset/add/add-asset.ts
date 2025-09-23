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
  assetStatusOptions = ['AVAILABLE', 'ASSIGNED', 'UNDER_MAINTENANCE', 'RETIRED'];
  brandOptions = ['Apple', 'Dell', 'HP', 'Samsung', 'Canon', 'Epson', 'Fujitsu', 'IKEA', 'Herman Miller'];
  locationOptions = [ 'Galleria40',
    'Uptown Cairo Shop', 'Mivida Shop', 'Stone Park Shop', 'Granda El Sherouk Shop',
    'Point 90 Shop', 'Layan Shop', 'New Giza Shop', 'October Park Shop',
    'SODIC Shop', 'Wahet El Ryhan Shop', 'Hurghada Shop'
  ];
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
      name: ['', [Validators.required]],
      brand: [null, [Validators.required]],
      assetDescription: [''],
      categoryId: [null, [Validators.required]],
      typeId: [null, [Validators.required]],
      location: [null, [Validators.required]],
      serialNumber: ['', [Validators.required]],
      purchaseDate: ['', [Validators.required]],
      warrantyEndDate: ['', [Validators.required]],
      status: [null, [Validators.required]],
      imagePath: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.onCategoryChange();
  }

  loadCategories(): void {
    this.categoryService.getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.categories = data);
  }

  onCategoryChange(): void {
    this.assetForm.get('categoryId')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(categoryId => {
        this.assetForm.get('typeId')?.setValue(null);
        this.types = [];
        if (categoryId) {
          this.typeService.getTypes(categoryId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(data => {
              this.types = data;
            });
        }
      });
  }

  onSubmit(): void {
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = null;

    const formValue = this.assetForm.value;
    const assetData: AssetRequest = {
      ...formValue,
      purchaseDate: new Date(formValue.purchaseDate).toISOString(),
      warrantyEndDate: new Date(formValue.warrantyEndDate).toISOString()
    };

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
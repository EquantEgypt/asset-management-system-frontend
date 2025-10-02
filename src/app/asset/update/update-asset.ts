// src/app/asset/update/update-asset.ts

import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssetService } from '../../services/assets.service';
import { CategoryService } from '../../services/category.service';
import { TypeService } from '../../services/assetType.service';
import { ToastService } from 'angular-toastify';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Category } from '../../model/categoryModel';
import { Type } from '../../model/AssetTypeModel';
import { UpdateAsset } from '../../model/update-asset.model';
import { AssetDetailsService } from '../../services/asset-details.service';
import { Brand } from '../../model/brand.enum';
import { Location } from '../../model/location.enum';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-update-asset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-asset.html',
  styleUrls: ['./update-asset.css']
})
export class UpdateAssetComponent implements OnInit {
  assetForm: FormGroup;
  categories: Category[] = [];
  types: Type[] = [];
  locations = Object.values(Location);
  brands = Object.values(Brand);
  errorMessage: string | null = null;
  isLoading = false;
  assetId!: number;

  private destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private assetDetailsService: AssetDetailsService
  ) {
    this.assetForm = this.fb.group({
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      assetDescription: [''],
      categoryId: [null, [Validators.required]],
      typeId: [{ value: null, disabled: true }, [Validators.required]],
      location: ['', [Validators.required]],
      serialNumber: ['', [Validators.required]],
      purchaseDate: ['', [Validators.required]],
      warrantyEndDate: ['', [Validators.required]],
      imagePath: ['']
    });
  }

  ngOnInit(): void {
    this.assetId = Number(this.route.snapshot.paramMap.get('id'));

    this.categoryService.getCategories().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(categories => this.categories = categories),
      switchMap(() => {
        if (this.assetId) {
          return this.assetDetailsService.getAssetDetails(this.assetId);
        }
        return of(null);
      })
    ).subscribe(asset => {
      if (asset) {
        const assetCategory = this.categories.find(c => c.name === asset.categoryName);
        const categoryId = assetCategory ? assetCategory.id : null;

        this.assetForm.patchValue({
          name: asset.assetName,
          brand: asset.brand,
          assetDescription: asset.assetDescription,
          location: asset.location,
          serialNumber: asset.serialNumber,
          purchaseDate: new Date(asset.purchaseDate).toISOString().split('T')[0],
          warrantyEndDate: new Date(asset.warrantyEndDate).toISOString().split('T')[0],
          categoryId: categoryId,
        });

        if (categoryId) {
          this.typeService.getTypes(categoryId).subscribe(types => {
            this.types = types;
            this.assetForm.get('typeId')?.enable();
            const assetType = this.types.find(t => t.name === asset.typeName);
            if (assetType) {
              this.assetForm.patchValue({ typeId: assetType.id });
            }
          });
        }
      }
    });

    this.assetForm.get('categoryId')?.valueChanges.subscribe(categoryId => {
      const typeControl = this.assetForm.get('typeId');
      if (categoryId) {
        typeControl?.reset(); 
        this.typeService.getTypes(categoryId).subscribe(types => {
          this.types = types;
          typeControl?.enable();
        });
      } else {
        this.types = [];
        typeControl?.reset();
        typeControl?.disable();
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
    const assetData: UpdateAsset = {
      ...formValue,
      purchaseDate: new Date(formValue.purchaseDate).toISOString(),
      warrantyEndDate: new Date(formValue.warrantyEndDate).toISOString()
    };

    this.assetService.updateAsset(this.assetId, assetData).subscribe({
      next: () => {
        this.isLoading = false;
        this.toast.success('Asset updated successfully!');
        this.router.navigate(['/assets', this.assetId]);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to update asset. Please try again.';
        if (this.errorMessage) {
          this.toast.error(this.errorMessage);
        }
        console.error(err);
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssetService, AssetRequest } from '../../services/assets.service';
import { Category, Type } from '../../model/asset.model';
import { ToastService } from 'angular-toastify';

export const stockDistributionValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const allStock = control.get('allStock')?.value ?? 0;
    const available = control.get('numberOfAvailableToAssign')?.value ?? 0;
    const maintenance = control.get('numberOfMaintenance')?.value ?? 0;
    const retired = control.get('numberOfRetired')?.value ?? 0;

    const sumOfParts = available + maintenance + retired;
    return sumOfParts > allStock
        ? { stockDistribution: 'The sum of available, maintenance, and retired assets cannot exceed the total stock.' }
        : null;
};


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
  apiErrorMessage: string | null = null;

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
    }, {
      validators: stockDistributionValidator
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadTypes();
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
    this.apiErrorMessage = null;
    this.assetForm.markAllAsTouched();

    if (this.assetForm.invalid) {
      const stockError = this.assetForm.errors?.['stockDistribution'];
      if (stockError) {
          this.toast.error(stockError);
      } else {
          this.toast.error('Please fill out all required fields correctly.');
      }
      return;
    }

    const assetData: AssetRequest = this.assetForm.value;
    this.assetService.addAsset(assetData).subscribe({
      next: () => {
        this.toast.success('Asset added successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.apiErrorMessage = err.error?.message || 'Failed to add asset. Please try again.';
        if (this.apiErrorMessage) {
          this.toast.error(this.apiErrorMessage);
        }
        console.error(err);
      }
    });
  }
}
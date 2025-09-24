import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';

import { Asset } from '../model/asset.model';
import { Category } from '../model/categoryModel';
import { Type } from '../model/AssetTypeModel';
import { User } from '../model/user.model';

import { AssetService } from '../services/assets.service';
import { AssignAssetService } from '../services/assign.asset.service';
import { CategoryService } from '../services/category.service';
import { TypeService } from '../services/assetType.service';
import { UserService } from '../services/user.service';
import { ToastService } from 'angular-toastify';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal/confirmation-modal.spec';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-assign-asset-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCardModule,
    SharedModule
    
  ],
  templateUrl: './assign-asset-form.html',
  styleUrl: './assign-asset-form.css'
})
export class AssignAssetForm implements OnInit {

  assignForm = new FormGroup({
    userId: new FormControl<number | null>(null, Validators.required),
    categoryId: new FormControl<number | null>(null, Validators.required),
    typeId: new FormControl<string | null>(null, Validators.required),
    assetId: new FormControl<number | null>(null, Validators.required),
    note: new FormControl<string | null>(null)
  });

  // Data
  assets: Asset[] = [];
  categories: Category[] = [];
  types: Type[] = [];

  showTypesField = false;
  showAssetsField = false;

  selectedUser: User | null = null;
  selectedAsset: Asset | null = null;

  // Autocomplete
  userSearch = new FormControl('');
  filteredUsers$: Observable<User[]> = of([]);

  // Inject services
  private userService = inject(UserService);
  private assetService = inject(AssetService);
  private assignService = inject(AssignAssetService);
  private categoryService = inject(CategoryService);
  private typeService = inject(TypeService);
  private toast = inject(ToastService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadCategories();
    this.initUserSearch();
  }

  private initUserSearch(): void {
    this.filteredUsers$ = this.userSearch.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value =>
        typeof value === 'string'
          ? this.userService.getUsers('', '', value).pipe(
              // assuming response: { content: User[] }
              switchMap(res => of(res.content))
            )
          : of([])
      )
    );
  }

  displayUser(user: User): string {
    return user && user.username ? user.username : '';
  }

  onUserSelected(user: User): void {
    this.selectedUser = user;
    this.assignForm.patchValue({ userId: user.id });
  }

  onCategoryChange(categoryId: number): void {
    this.typeService.getTypes(categoryId).subscribe(types => {
      this.types = types;
      this.showTypesField = true;
    });
  }

  onTypeChange(type: string): void {
    this.assetService.getAvAssets(type).subscribe(assets => {
      this.assets = assets;
      this.showAssetsField = true;
    });
  }

  onSubmit(): void {
    if (!this.assignForm.valid) return;

    const assetId = this.assignForm.value.assetId!;
    this.selectedAsset = this.assets.find(a => a.assetId === assetId) || null;

    this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: {
        user: this.selectedUser,
        asset: this.selectedAsset,
        formValue: this.assignForm.value
      }
    }).afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.confirmAssignment();
      }
    });
  }

  confirmAssignment(): void {
    const { assetId, userId, assignmentDate, returnDate, note } = this.assignForm.value;

    this.assignService.assignAsset({
      assetId: assetId!,
      userId: userId!,
      assignmentDate: assignmentDate!,
      returnDate: returnDate || undefined,
      note: note || undefined
    }).subscribe({
      next: () => {
        this.toast.success('Asset assigned successfully');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.toast.error('Failed to assign asset');
      }
    });
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => (this.categories = data));
  }
}

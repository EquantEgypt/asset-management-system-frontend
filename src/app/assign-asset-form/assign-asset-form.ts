import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
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
import { AssignPerRequest } from '../model/request.model';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-assign-asset-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './assign-asset-form.html',
  styleUrl: './assign-asset-form.css'
})
export class AssignAssetForm implements OnInit {

  assignForm = new FormGroup({
    userId: new FormControl<number | null>(null, Validators.required),
    categoryId: new FormControl<number | null>(null, Validators.required),
    typeId: new FormControl<number | null>(null, Validators.required),
    typeName: new FormControl<string | null>(null),
    assetId: new FormControl<number | null>(null, Validators.required),
    note: new FormControl<string | null>(null)
  });
  @Input() receivedData: AssignPerRequest | null = null;
@Output() closeModal = new EventEmitter<boolean>();

  // Data
  assets: Asset[] = [];
  categories: Category[] = [];
  types: Type[] = [];

  showTypesField = false;
  showAssetsField = false;

  selectedUser: User | null = null;
  selectedAsset: Asset | null = null;
  defaultUserName: string = '';
  defaultUserId: number | null = null;
  typeId: number | null = null;
  disabelAll = false;
  // Autocomplete
  userSearch = new FormControl<User | string>('');
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
  private requestService = inject(RequestService);

  ngOnInit(): void {
    this.loadCategories();
    this.initUserSearch();
    const navigationState = history.state;
    if (navigationState?.user) {
      this.selectedUser = navigationState.user as User;
      this.assignForm.patchValue({ userId: this.selectedUser.id });
      this.userSearch.setValue(this.selectedUser);
    }
    if (this.receivedData) {
      this.disabelAll = true;

      const userObj: User = {
        id: this.receivedData.userId,
        username: this.receivedData.userName,
      } as User;
      this.selectedUser = userObj;
      this.assignForm.patchValue({
        userId: this.receivedData.userId,
        categoryId: this.receivedData.categoryId,
        typeName: this.receivedData.typeName
      });
      const typeObj: Type = {
        id: this.receivedData.typeId,
        name: this.receivedData.typeName,
      } as Type;

      this.onTypeChange(typeObj)
      this.userSearch.setValue(userObj);
      this.userSearch.disable();
      this.assignForm.get('categoryId')?.disable();
    }
  }


  private initUserSearch(): void {
    this.filteredUsers$ = this.userSearch.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value =>
        typeof value === 'string'
          ? this.userService.getUsers('', '', value).pipe(
            switchMap(res => of(res.content))
          )
          : of([])
      )
    );
  }

  displayUser(user: User): string {
    return user ? user.username : '';
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

  onTypeChange(type: Type): void {
    if (!type) return;

    this.assignForm.patchValue({
      typeId: type.id,
      typeName: type.name
    });

    this.assetService.getAvAssets(type.name).subscribe(assets => {
      this.assets = assets;
      this.showAssetsField = true;
    });
  }


  onSubmit(): void {
    if (!this.assignForm.valid) return;
    const { userId, note } = this.assignForm.value;
    const assetId = this.assignForm.value.assetId!;
    this.selectedAsset = this.assets.find(a => a.assetId === assetId) || null;
    console.log(assetId, userId, note)

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
    const { assetId, userId, note, typeId, categoryId } = this.assignForm.getRawValue();;
    console.log(categoryId)
    this.assignService.assignAsset({
      assetId: assetId!,
      userId: userId!,
      note: note || undefined,
      typeId: typeId!,
      categoryId: categoryId!,
    }).subscribe({
      next: () => {
        this.toast.success('Asset assigned successfully');

        if (this.receivedData) {
          this.requestService
            .respondToRequest(this.receivedData.requestId, 'NEW', 'APPROVED')
            .subscribe({
              next: () => {
this.closeModal.emit(true);

                console.log('Request updated successfully');
              },
              error: (err) => {
                console.error('Failed to update request', err);
              },
            });
        }

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

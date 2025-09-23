import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Asset } from '../model/asset.model';
import { AssetService } from '../services/assets.service';
import { SharedModule } from '../shared/shared.module';
import { AssignAssetService } from '../services/assign.asset.service';
import { ToastService } from 'angular-toastify';
import { Router, RouterLink } from '@angular/router';
import { TypeService } from '../services/assetType.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/categoryModel';
import { Type } from '../model/AssetTypeModel';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-assign-asset-form',
  imports: [SharedModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './assign-asset-form.html',
  styleUrl: './assign-asset-form.css'
})
export class AssignAssetForm {
  userName: String | null = null;
  userId: number | null = null;
  isReadonly: boolean = true;
  assets: Asset[] = [];
  categories: Category[] = [];
  types: Type[] = [];
  showAssetsField: boolean = false;
  showTypesField: boolean = false;
  users: User[] = [];
  searchWord: string = "";
  selectedUser: User | null = null;
  isDropdownOpen: boolean = false;
  showConfirmationModal: boolean = false;
  selectedAsset: Asset | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private assetService: AssetService,
    private assign: AssignAssetService,
    private toast: ToastService,
    private categoryService: CategoryService,
    private typeService: TypeService,
  ) { }
  assignForm = new FormGroup({
    userId: new FormControl<number | null>(null, Validators.required),

    categoryId: new FormControl('', Validators.required),
    typeId: new FormControl('', Validators.required),
    assetId: new FormControl('', Validators.required),
    assignmentDate: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
    returnDate: new FormControl(''),
    note: new FormControl('')
  });

  ngOnInit() {
    this.loadAvailableAssets();
    this.loadCategories();
    this.loadTypes();
    const navData = history.state;
    this.userId = navData?.id || null;
    this.userName = navData?.name || null;
    this.loadUsers()
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectUser(user: User) {
    this.assignForm.patchValue({ userId: user.id });
    this.userName = user.username;
    this.selectedUser = user;
    this.isDropdownOpen = false;
  }
  loadUsers(): void {
    this.userService.getUsers('', '', this.searchWord)
      .subscribe(res => {
        this.users = res.content;
        if (this.userId) {
          this.assignForm.patchValue({ userId: this.userId });
        }
      });
  }
  searchByName(text: string) {
    this.searchWord = text;
    this.loadUsers();
  }

  displayTypesField(categoryId?: number) {
    this.loadTypes(categoryId);
    this.showTypesField = true;
  }
  displayAssetsField(assetType: string) {
    this.loadAvailableAssets(assetType);
    this.showAssetsField = true;
  }
  loadCategories(): void {
    this.categoryService.getCategories()
      .subscribe(data => this.categories = data);
  }
  loadTypes(categoryId?: number): void {
    this.typeService.getTypes(categoryId)
      .subscribe({
        next: (types) => {
          this.types = types;
        },
        error: (err) => console.error('Error loading types', err)
      });
  }
  loadAvailableAssets(type?: string) {
    this.assetService.getAvAssets(type).subscribe({
      next: (assets) => {
        this.assets = assets;
      },
      error: (err) => console.error('Error loading assets', err)
    });
  }
  toggleConfirmationModal() {
    this.showConfirmationModal = !this.showConfirmationModal;
  }
  onSubmit() {
    if (this.assignForm.valid) {
      const assetId = Number(this.assignForm.value.assetId);
      this.selectedAsset = this.assets.find(a => a.assetId === assetId) || null;
      this.showConfirmationModal = true;
    }
  }

  confirmAssignment() {
    if (this.assignForm.valid) {
      const formData = {
        assetId: Number(this.assignForm.value.assetId),
        userId: Number(this.assignForm.value.userId),
        assignmentDate: this.assignForm.value.assignmentDate!,
        returnDate: this.assignForm.value.returnDate || undefined,
        note: this.assignForm.value.note || undefined
      };

      this.assign.assignAsset(formData).subscribe({
        next: () => {
          this.toast.success('Asset assigned successfully');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    }
  }
}


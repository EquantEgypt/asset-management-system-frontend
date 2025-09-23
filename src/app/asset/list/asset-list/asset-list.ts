import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../services/assets.service';
import { Asset } from '../../../model/asset.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../model/roles.enum';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MiniAsset } from '../../../model/MiniAsset.model';
import { Page } from '../../../model/Page.model';
import { Category } from '../../../model/categoryModel';
import { Type } from '../../../model/AssetTypeModel';
import { CategoryService } from '../../../services/category.service';
import { TypeService } from '../../../services/assetType.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Department } from '../../../model/department.model';
import { DepartmentService } from '../../../services/departments.service';
import { User } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './asset-list.html',
  styleUrls: ['./asset-list.css'],
})
export class AssetList implements OnInit {
  assets: MiniAsset[] = [];
  userRole: Role | null = null;
  isLoading = true;
  categories: Category[] = [];
  types: Type[] = [];
  departments: Department[] = [];
  users: User[] = [];
  assetStatusOptions = ['AVAILABLE', 'ASSIGNED', 'UNDER_MAINTENANCE', 'RETIRED'];

  // Filter properties
  filteredCategory = '';
  filteredType = '';
  filteredStatus = '';
  filteredDepartment = '';
  filteredUser = '';

  displayedColumns: string[] = [
    'id',
    'name',
    'brand',
    'category',
    'type',
    'status',
    'assignedUser',
    'department',
  ];

  constructor(
    private assetService: AssetService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private departmentService: DepartmentService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    this.loadAssets();
    if (this.isAdmin) {
      this.loadCategories();
      this.loadTypes();
      this.loadDepartments();
    }
  }

  get isAdmin(): boolean {
    return this.userRole === Role.ADMIN;
  }

  loadAssets(): void {
    this.isLoading = true;
    const filters: any = {};

    if (this.isAdmin) {
      if (this.filteredCategory) filters.category = this.filteredCategory;
      if (this.filteredType) filters.type = this.filteredType;
      if (this.filteredStatus) filters.status = this.filteredStatus;
      if (this.filteredDepartment) filters.department = this.filteredDepartment;
      if (this.filteredUser) filters.assignedUser = this.filteredUser;
    } else if (this.userRole === Role.MANAGER) {
      filters.department = this.authService.getCurrentUserDepartment();
    } else {
      filters.assignedUser = this.authService.getCurrentUsername();
    }

    this.assetService.getAssets(filters).subscribe({
      next: (data) => {
        this.assets = data.content;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load assets', err);
        this.isLoading = false;
      },
    });
  }

  loadCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((data) => (this.categories = data));
  }

  loadTypes(): void {
    this.typeService.getTypes().subscribe((data) => (this.types = data));
  }

  loadDepartments(): void {
    this.departmentService.getDepartmentsName().subscribe((data) => (this.departments = data));
  }



  applyFilters(): void {
    this.loadAssets();
  }

  navigateToAddAsset(): void {
    this.router.navigate(['/assets/add']);
  }
}
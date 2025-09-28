import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../services/assets.service';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../model/roles.enum';
import { Router } from '@angular/router';
import { AssetListDTO } from '../../../model/asset-list-dto.model';
import { Category } from '../../../model/categoryModel';
import { Type } from '../../../model/AssetTypeModel';
import { CategoryService } from '../../../services/category.service';
import { TypeService } from '../../../services/assetType.service';
import { Department } from '../../../model/department.model';
import { DepartmentService } from '../../../services/departments.service';
import { User } from '../../../model/user.model';
import { UserService } from '../../../services/user.service';
import { PageEvent } from '@angular/material/paginator';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AssetFilter } from '../../../model/asset-filter.model';
import { AssetStatus } from '../../../model/asset-status.enum';
@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './asset-list.html',
  styleUrls: ['./asset-list.css'],
})
export class AssetList implements OnInit {
  assets: AssetListDTO[] = [];
  isAdmin: boolean = false;
  isIT: boolean = false;
  isLoading = true;
  categories: Category[] = [];
  types: Type[] = [];
  departments: Department[] = [];
  users: User[] = [];
  assetStatusOptions: AssetStatus[] =[AssetStatus.ASSIGNED,AssetStatus.AVAILABLE,AssetStatus.UNDER_MAINTENANCE,AssetStatus.RETIRED];

  // Filter properties
  category: Category = { id: -1, name: '' };
  filteredType = '';
  filteredStatus = '';
  filteredDepartment = '';
  filteredUser = '';
  showTypesField = false;
  showAssetsField = false;
  // Pagination properties
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  displayedColumns: string[] = [
    'serialNumber',
    'name',
    'brand',
    'category',
    'type',
    'status',
    'assignedUser',
    'department',
    'actions'
  ];

  constructor(
    private assetService: AssetService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.loadAssets();
    if (this.authService.isAdmin() || this.authService.isIT()) {
      this.loadCategories();
      this.loadTypes();
      this.loadDepartments();
    }
    if (this.authService.isIT()) {
      this.isIT = true;
    }
    if (this.authService.isAdmin()) {
      this.isAdmin = true;
    }
  }
  onCategoryChange(categoryId: number): void {
    this.typeService.getTypes(categoryId).subscribe((types) => {
      this.types = types;
      this.showTypesField = true;
    });
  }

  loadAssets(): void {
    this.isLoading = true;
    const filters: AssetFilter = {
      page: this.pageIndex,
      size: this.pageSize,
    };

    if (this.authService.isAdmin()) {
      if (this.category.name) filters.category = this.category.name;
      if (this.filteredType) filters.type = this.filteredType;
      if (this.filteredStatus) filters.status = this.filteredStatus;
      if (this.filteredDepartment) filters.department = this.filteredDepartment;
      if (this.filteredUser) filters.assignedUser = this.filteredUser;
    
    }

    this.assetService.getAssets(filters).subscribe({
      next: (data) => {
        this.assets = data.content;
        this.totalElements = data.page.totalElements;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load assets', err);
        this.isLoading = false;
      },
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Failed to load categories', err),
    });
  }

  loadTypes(): void {
    this.typeService.getTypes().subscribe({
      next: (data) => {
        this.types = data;
      },
      error: (err) => {
        console.error('Failed to load types', err);
        this.types = [];
      },
    });
  }

  loadDepartments(): void {
    this.departmentService.getDepartmentsName().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        console.error('Failed to load departments', err);
        this.departments = [];
      },
    });
  }

  applyFilters(): void {
    if (this.category.id != -1) {
      this.onCategoryChange(this.category.id);
    }
    this.pageIndex = 0;
    this.loadAssets();
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadAssets();
  }

  navigateToAddAsset(): void {
    this.router.navigate(['/assets/add']);
  }

  navigateToUpdateAsset(id: number): void {
    console.log('ello')
    this.router.navigate(['/assets/update', id]);
  }
  onRowClick(asset: any) {
  console.log("Row clicked:", asset);

  this.router.navigate(['/assets', asset.id]);

}

}
   


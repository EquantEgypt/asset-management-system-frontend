import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../model/user.model';
import {MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import {  MatTableModule } from '@angular/material/table';
import { UserService } from '../../../services/users.service';
import { Department } from '../../../model/department.model';
import { DepartmentService } from '../../../services/departments.service';
import { Role } from '../../../model/roles.enum';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule,MatProgressSpinnerModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})

export class UserList implements OnInit {
  totalElements = 0;
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions = [3, 5, 7];
  searchName: string = "";
  departments: Department[] = [];
  role: Role | null = null;
  filteredDepartment: number | '' = '';
  users: User[] = [];
  isLoading = false;
  constructor(
    private userService: UserService,
    private departmentService: DepartmentService,
    private auth: AuthService

  ) { }



  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'department'];



  ngOnInit() {
    this.loadUsers();
    this.role = this.auth.getRole();
    this.loadDepartments();


  }

  loadUsers(): void {
  this.isLoading = true;
    this.userService.getUsers(this.pageIndex, this.pageSize, this.searchName, this.filteredDepartment)
      .subscribe(res => {
        this.users = res.content;
        this.totalElements = res.page?.totalElements || 0;
        this.isLoading = false;

      });
  }



  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadUsers();

  }

  searchByName(text: string) {
    this.searchName = text.toLowerCase().trim();
    this.pageIndex = 0;
    this.loadUsers();
  }

  loadDepartments(): void {
    this.departmentService.getDepartmentsName().subscribe({
      next: (res) => this.departments = res,
      error: (err) => console.error("can't load departments", err)
    });
  }
  filterByDepartment(): void {
    this.pageIndex = 0;
    this.loadUsers();
  }
  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
     this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    
    console.log('Page event - Index:', e.pageIndex, 'Size:', e.pageSize);
    console.log('Total elements:', this.totalElements);
    
    this.loadUsers(e.pageIndex, e.pageSize);

  }

  
}

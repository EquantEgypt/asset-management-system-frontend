import {  Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { PageEvent } from '@angular/material/paginator';
import { Role } from '../../../model/roles.enum';
import { AuthService } from '../../../services/auth.service';
import { SharedModule } from '../../../shared/shared.module';
import { UserService } from '../../../services/user.service';
import { Department } from '../../../model/department.model';
import { DepartmentService } from '../../../services/departments.service';


@Component({
  selector: 'app-user-list',
  imports: [SharedModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})

export class UserList implements OnInit {
  totalElements = 0;
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions = [3, 5, 7];
  searchWord: string = "";
  departments: Department[] = [];
  userRole: Role | null = null;
  filteredDepartment: number | '' = '';
  filteredRole:string |''=''
  Role=Role;
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
    this.userRole = this.auth.getRole();
    this.loadDepartments();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers(this.pageIndex, this.pageSize, this.searchWord, this.filteredDepartment,this.filteredRole)
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

  searchByNameOrEmail(text: string) {
    this.searchWord = text.toLowerCase().trim();
    this.pageIndex = 0;
    this.loadUsers();
  }

  
  pageEvent: PageEvent | undefined;

  

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


roles = Object.values(Role);

filterByRole(): void {
    this.pageIndex = 0;
    this.loadUsers();
  }

}
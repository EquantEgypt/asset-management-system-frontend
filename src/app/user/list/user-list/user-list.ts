import {  Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { PageEvent } from '@angular/material/paginator';
import { Role } from '../../../model/roles.enum';
import { AuthService } from '../../../services/auth.service';
import { SharedModule } from '../../../shared/shared.module';
import { UserService } from '../../../services/user.service';
import { Department } from '../../../model/department.model';
import { DepartmentService } from '../../../services/departments.service';
import { AddRequestComponent } from '../../../request/add/add-request.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  imports: [SharedModule,AddRequestComponent],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})

export class UserList implements OnInit {
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 15, 20];
  searchWord: string = "";
  departments: Department[] = [];
  userRole: Role | null = null;
  filteredDepartment: number | '' = '';
  filteredRole:string |''=''
  Role=Role;
  users: User[] = [];
  isLoading = false;
  formModal: boolean = false;
  requestModal: boolean = false;
  userId: number | null = null;
  userName: string | null = null;
  constructor(
    private userService: UserService,
    private departmentService: DepartmentService,
    private auth: AuthService,
        private router: Router


  ) { }

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'department', 'assign_asset', 'request'];
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
toggleRequestModal(event: Event, user: User) {
    event.stopPropagation();
    this.userId = user.id;
    this.userName = user.username;
    this.requestModal = !this.requestModal;
  }
toggleRequestModal(event: Event, user: User) {
    event.stopPropagation();
    this.userId = user.id;
    this.userName = user.username;
    this.requestModal = !this.requestModal;
  }
closeModal() {
  this.requestModal = false;
  this.userId = null;
  this.userName = null;
}
 navigateToAssignAsset(user: User): void {
    this.router.navigate(['/asset-assignments'], {
state: { user }    });
  }

}
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../model/user.model';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../../services/users.service';
import { Department } from '../../../model/department.model';
import { DepartmentService } from '../../../services/departments.service';
import { Role } from '../../../model/roles.enum';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})

export class UserList implements AfterViewInit {
  totalElements = 0;
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions = [3, 5, 7];
  searchName: string = "";
  departments: Department[] = [];
  selectedDepartment: string = "";
  role: Role | null = null;

  constructor(
    private userService: UserService,
    private departmentService: DepartmentService,
    private auth: AuthService

  ) { }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  dataSource = new MatTableDataSource<User>([]);

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'department'];



  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator; assign paginator to dataSource for server-side pagination
    this.loadUsers(this.pageIndex, this.pageSize, this.searchName);
     this.role = this.auth.getRole(); 

  }
  loadUsers(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize, username?: string) {
    this.userService.getUsers(pageIndex, pageSize, username).subscribe(res => {
      this.dataSource.data = res.content;
      this.totalElements = res.page?.totalElements || 0;


      if (this.paginator) {
        this.paginator.length = this.totalElements;
        this.paginator.pageIndex = pageIndex;
        this.paginator.pageSize = pageSize;
      }


    });
  }


  // pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadUsers(this.pageIndex, this.pageSize, this.searchName);

  }

  searchByName(text: string) {
    this.searchName = text.toLowerCase().trim();
    this.pageIndex = 0; // reset to first page when searching
    this.loadUsers(this.pageIndex, this.pageSize, this.searchName);
  }
  ngOnInit(): void {
    this.loadDepartments(); //  this to load department names when page renders
  }
  loadDepartments(): void {
    this.departmentService.getDepartmentsName().subscribe({
      next: (res) => this.departments = res,
      error: (err) => console.error("can't load departments", err)
    });
  }
}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { User } from '../../../model/user.model';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatTableModule,MatPaginatorModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})

export class UserList  implements AfterViewInit {
 pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  constructor (private userService: UserService){}
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  dataSource = new MatTableDataSource<User>([]);

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'department'];
  

  totalElements = 0;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadUsers();
  }

  loadUsers(pageIndex: number = 0, pageSize: number = 5) {
    this.userService.getUsers(pageIndex, pageSize).subscribe(res => {
      this.dataSource.data = res.content;     
      this.totalElements = res.page.totalElements; 
      console.log(res);
    });
  }
  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    console.log('the page size now is ' , this.pageSize);
    this.pageIndex = e.pageIndex;
      console.log('the page index now is ' , this.pageIndex);
      this.loadUsers(e.pageIndex, e.pageSize);

  }

  // onPageChange(event: any) {
  //   this.loadUsers(event.pageIndex, event.pageSize);
  // }
}

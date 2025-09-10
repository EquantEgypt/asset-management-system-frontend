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
  totalElements=0;
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions = [3, 5, 7];
  constructor (private userService: UserService){}
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  dataSource = new MatTableDataSource<User>([]);

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'department'];
  
//this is making a problem like i want the paginator to be 1 – 3 of (elementlength) but it always return 1 – datasource no of data source no 


  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator; assign paginator to dataSource for server-side pagination
    this.loadUsers(this.pageIndex,this.pageSize);

  }
  loadUsers(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
  this.userService.getUsers(pageIndex, pageSize).subscribe(res => {
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
    
    console.log('Page event - Index:', e.pageIndex, 'Size:', e.pageSize);
    console.log('Total elements:', this.totalElements);
    
    this.loadUsers(e.pageIndex, e.pageSize);

  }

  
}

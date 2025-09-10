import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource } from '@angular/material/table';

import { User } from '../../model/user.model';
import { AssetService } from '../../services/assets.service';

@Component({
  selector: 'app-users-container',
  standalone: true,
  imports: [CommonModule, MatTableModule],   // <-- must include MatTableModule
  templateUrl: './users-container.html',
  styleUrls: ['./users-container.css']
})
export class UsersContainer {
  users: User[] = [];
  loading = true;

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'department'];

  dataSource = new MatTableDataSource<User>([]);  // <-- DataSource for pagination

  constructor(private assetService: AssetService) {}
  ngOnInit() {
    this.assetService.getDisplayedUsers().subscribe(data => {
      this.users = data;
    console.log('Users from API:', this.users);
      this.loading = false;
    });
  }
  
}

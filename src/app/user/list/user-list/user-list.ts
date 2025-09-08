import { Component } from '@angular/core';
import { User } from '../../../model/user.model';
import {users} from '../../../services/assets.service'
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatTableModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {
users: User[] = users;

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'department'];
}

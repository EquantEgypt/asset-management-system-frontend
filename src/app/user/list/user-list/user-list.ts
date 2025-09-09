import { Component } from '@angular/core';
import { User } from '../../../model/user.model';
import {users} from '../../../services/assets.service'
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatTableModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})

export class UserList {

  constructor (private userService: UserService){}
users: User[] = [];

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'department'];
  ngOnInit(){
    this.userService.getUsers().subscribe(data => {
      this.users =data;
      
    })
  }
}

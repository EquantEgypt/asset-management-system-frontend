import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../model/roles.enum';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatTableModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {
  users: User[] = [];
  isLoading = true;
  canViewUsers = false;

  displayedColumns: string[] = ['id', 'username', 'email', 'role', 'department'];

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userRole = this.authService.getRole();
    if (userRole && userRole.roleType === Role.ADMIN) {
      this.canViewUsers = true;
      this.loadUsers();
    } else {
      this.isLoading = false;
    }
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Failed to load users", err);
        this.isLoading = false;
      }
    });
  }
}
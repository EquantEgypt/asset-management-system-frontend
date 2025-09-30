import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../app/services/auth.service';
import { ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.css']
})
export class AppHeaderComponent {
  @Input() userEmail: string = ''; 
  dropdownOpen = false;

  @Output() logoutEvent = new EventEmitter<void>(); 

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.logoutEvent.emit();
  }

}
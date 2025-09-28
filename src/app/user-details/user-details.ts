import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {UserDetailsService } from '../services/user-details.service';
import { UserDetailsModel } from '../model/UserDetailsModel';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.html',
  styleUrls: ['./user-details.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UserDetailsComponent implements OnInit {
  userDetails?: UserDetailsModel;

  constructor(
    private route: ActivatedRoute,
    private userDetailsService: UserDetailsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.userDetailsService.getUserDetails(id).subscribe(data => {
        this.userDetails = data;
      });
    }
  }
}

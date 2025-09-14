import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../services/assets.service';
import { Asset } from '../../../model/asset.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../model/roles.enum';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-asset-list',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './asset-list.html',
  styleUrls: ['./asset-list.css']
})
export class AssetList implements OnInit {

  assets: Asset[] = [];
  isAdmin = false;
  isLoading = true;

  displayedColumns: string[] = [
    'assetId',
    'assetName',
    'brand',
    'category',
    'type',
    'quantity', 
  ];

  constructor(
    private assetService: AssetService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.loadAssets();
  }

  checkUserRole(): void {
    const userRole = this.authService.getRole();
    if (userRole && userRole === Role.ADMIN) {
      this.isAdmin = true;
    }
  }

  loadAssets(): void {
    this.isLoading = true;
    this.assetService.getAssets().subscribe({
      next: (data) => {
        this.assets = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load assets', err);
        this.isLoading = false;
      }
    });
  }

  navigateToAddAsset(): void {
    this.router.navigate(['/assets/add']);
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetDetailsdto } from '../model/AssetDetails.model';
import { AssetDetailsService } from '../services/asset-details.service';
import { SharedModule } from '../shared/shared.module';
import { Role } from '../model/roles.enum';               
import { AuthService } from '../services/auth.service';   
import { AssetStatus } from '../model/asset-status.enum';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.html',
  styleUrl: './asset-details.css',
  standalone: true,
  imports: [
    SharedModule,
   
],
})
export class AssetDetails implements OnInit {
  asset?: AssetDetailsdto;
  isLoading = true;
  userRole: Role | null = null;   
  Role = Role;   
  constructor(
    private route: ActivatedRoute,
    private assetDetailsService: AssetDetailsService,
    private router: Router  , 
    private authService: AuthService,   


  ) {}
goToHistory(id: number) {

  this.router.navigate(['/history', id]);
}

goToEdit(id: number) {
    this.router.navigate(['/assets/update', id]);
  }
  ngOnInit(): void {
        this.userRole = this.authService.getRole();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.assetDetailsService.getAssetDetails(id).subscribe({
        next: (data) => {
          this.asset = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading asset details:', err);
          this.isLoading = false;
        

        }
      });
    }
  }

getStatusClass(status: AssetStatus | string): string {
    switch (status) {
      case AssetStatus.AVAILABLE:
        return 'available';
      case AssetStatus.ASSIGNED:
        return 'assigned';
      case AssetStatus.UNDER_MAINTENANCE:
        return 'maintenance';
      case AssetStatus.RETIRED:
        return 'retired';
      default:
        return 'available';
    }
  }

goBackToDashboard(): void {
  this.router.navigate(['/dashboard']);   
}
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetDetailsdto } from '../model/AssetDetails.model';
import { AssetDetailsService } from '../services/asset-details.service';
import { SharedModule } from '../shared/shared.module';
import { Role } from '../model/roles.enum';               
import { AuthService } from '../services/auth.service';   

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

  getStatusClass(status: string): string {
    const statusLower = status?.toLowerCase() || '';
    
    if (statusLower.includes('available')) {
      return 'available';
    } else if (statusLower.includes('assigned')) {
      return 'assigned';
    } else if (statusLower.includes('maintenance') || statusLower.includes('repair')) {
      return 'maintenance';
    } else if (statusLower.includes('retired') || statusLower.includes('disposed')) {
      return 'retired';
    }
    
    return 'available'; 
  }

goBackToDashboard(): void {
  this.router.navigate(['/dashboard']);   
}
}

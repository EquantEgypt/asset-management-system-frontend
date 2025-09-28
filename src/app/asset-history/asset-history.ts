

import { Component, OnInit } from '@angular/core';

import { AssetHistorydto } from '../model/AssetHistory.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetHistoryService } from '../services/asset-history.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-asset-history',
  standalone: true,
  imports: [
SharedModule,
  ],
  templateUrl: './asset-history.html',
  styleUrls: ['./asset-history.css'],
})
export class AssetHistory implements OnInit {
  historyList: AssetHistorydto[] = [];   
  assetId!: number;   
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private assetHistoryService: AssetHistoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assetId = Number(this.route.snapshot.paramMap.get('id')); // 👈 save it
    if (this.assetId) {
      this.assetHistoryService.getAssetHistory(this.assetId).subscribe({
        next: (data) => {  
          this.historyList = data;   
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading asset history:', err);
          this.isLoading = false;
        }
      });
    }
  }

goBackToDetails(): void {
    this.router.navigate(['/assets', this.assetId]);  
  }
 getStatusClass(status: string): string {
    const statusLower = status?.toLowerCase() || '';
    
    if (statusLower.includes('available') || statusLower.includes('active')) {
      return 'status-available';
    } else if (statusLower.includes('assigned') || statusLower.includes('in-use')) {
      return 'status-assigned';
    } else if (statusLower.includes('maintenance') || statusLower.includes('repair')) {
      return 'status-maintenance';
    } else if (statusLower.includes('retired') || statusLower.includes('disposed')) {
      return 'status-retired';
    }
    
    return 'status-available'; 
  }



}

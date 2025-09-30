
import { Component, OnInit } from '@angular/core';
import { AssetHistorydto } from '../model/AssetHistory.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetHistoryService } from '../services/asset-history.service';
import { SharedModule } from '../shared/shared.module';
import { AssetStatus } from '../model/asset-status.enum';

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
    this.assetId = Number(this.route.snapshot.paramMap.get('id')); 
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


}
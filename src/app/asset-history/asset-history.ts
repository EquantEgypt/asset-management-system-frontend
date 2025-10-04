
import { Component, OnInit } from '@angular/core';
import { AssetHistorydto } from '../model/AssetHistory.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetHistoryService, Page} from '../services/asset-history.service';
import { SharedModule } from '../shared/shared.module';
import { AssetStatus } from '../model/asset-status.enum';
import { PageEvent } from '@angular/material/paginator';

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



  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 15, 20];

  constructor(
    private route: ActivatedRoute,
    private assetHistoryService: AssetHistoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assetId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.assetId) {
      this.loadHistory();
    }
  }
loadHistory(): void {
   // this.isLoading = true;
    this.assetHistoryService.getAssetHistory(this.assetId, this.pageIndex, this.pageSize).subscribe({
      next: (data: Page<AssetHistorydto>) => {
        this.historyList = data.content;
        this.totalElements = data.page.totalElements;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading asset history:', err);
        this.isLoading = false;
      }
    });
  }
    handlePageEvent(event: PageEvent): void  {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadHistory();
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
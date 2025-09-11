import { Component } from '@angular/core';
import { AssetService } from '../../../services/assets.service';
import { Asset } from '../../../model/asset.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './asset-list.html',
  styleUrls: ['./asset-list.css'],
})
export class AssetList {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  searchTerm: string = '';

  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'type',
    'assignedTo',
    'status',
    'purchaseDate',
  ];

  constructor(private assetService: AssetService) {}

  ngOnInit() {
    this.loadAssets();
  }

  applySearch() {
    const term = this.searchTerm.trim();
    if (!term) {
      this.loadAssets();
      return;
    }

    this.assetService.searchAssets(term).subscribe({
      next: (data) => {
        this.filteredAssets = data.map(item => this.mapAsset(item));
      },
      error: (err) => {
        console.error('Error fetching assets', err);
        this.filteredAssets = [];
      }
    });
  }

  public loadAssets() {
    this.assetService.getAssetsByRole().subscribe({
      next: (data) => {
        this.filteredAssets = data.map(item => this.mapAsset(item));
      },
      error: (err) => {
        console.error('Error fetching assets', err);
        this.filteredAssets = [];
      }
    });
  }

  private mapAsset(item: any): any {
    return {
      id: item.id,
      name: item.asset?.assetName || '—',
      category: item.asset?.category?.categoryName || '—',
      type: item.asset?.type?.typeName || '—',
      assignedTo: item.assignedUser?.username || '—',
      status: item.status || '—',
      purchaseDate: item.dateAssigned ? new Date(item.dateAssigned).toLocaleDateString() : '—',
    };
  }
}

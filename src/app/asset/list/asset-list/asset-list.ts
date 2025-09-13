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
  const term = this.searchTerm.trim().toLowerCase();

  if (!term) {
    // لو السيرش فاضي رجع كل الأصول اللي اتحملت
    this.filteredAssets = [...this.assets];
    return;
  }

  this.filteredAssets = this.assets.filter(asset =>
    asset.name.toLowerCase().includes(term) ||
    asset.category.toLowerCase().includes(term) ||
    asset.type.toLowerCase().includes(term)
  );
}


public loadAssets() {
  this.assetService.getAssetsByRole().subscribe({
    next: (data) => {
      this.assets = data.map(item => this.mapAsset(item));   // نخزن كل الأصول
      this.filteredAssets = [...this.assets];                // نظهرهم كلهم أول ما نحمل
    },
    error: (err) => {
      console.error('Error fetching assets', err);
      this.assets = [];
      this.filteredAssets = [];
    }
  });
}

  private mapAsset(item: any): any {
  return {
    id: item.assetId,   // بدلاً من item.id
    name: item.assetName || '—',
    category: item.category?.categoryName || '—',
    type: item.type?.typeName || '—',
    assignedTo: '—',  // لسه مش راجع مع الـ DTO
    status: '—',      // برضه مش راجع مع الـ DTO
    purchaseDate: '—' // مش موجود في DTO بتاعك
  };
}

}

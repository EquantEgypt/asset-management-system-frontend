import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { Asset } from '../../model/asset.model';
import { AssetService } from '../../services/assets.service';

@Component({
  selector: 'app-assets-container',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './assets-container.html',
  styleUrls: ['./assets-container.css']
})
export class AssetsContainer {
  assets: Asset[] = [];
  loading = true;

  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'type',
    'assignedTo',
    'status',
    'purchaseDate'
  ];

  constructor(private assetService: AssetService) {}

  ngOnInit() {
    this.assetService.getDisplayedAssets().subscribe(data => {
      this.assets = data;
      this.loading = false;
    });
  }
}

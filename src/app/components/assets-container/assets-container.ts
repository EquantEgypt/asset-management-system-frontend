import { Component } from '@angular/core';
import { Asset } from '../../model/asset.model';
import { AssetService } from '../../services/assets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assets-container',
  imports: [CommonModule],
  templateUrl: './assets-container.html',
  styleUrl: './assets-container.css'
})
export class AssetsContainer {
  assets: Asset[] = [];
  loading = true;

  constructor(private assetService: AssetService) {}

  ngOnInit() {
    this.assetService.getDisplayedAssets().subscribe(data => {
      this.assets = data;
      this.loading = false;
    });
  }

}

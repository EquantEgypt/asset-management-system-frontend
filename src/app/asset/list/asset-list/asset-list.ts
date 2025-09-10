import { Component } from '@angular/core';
import { AssetService } from '../../../services/assets.service';
import { Asset } from '../../../model/asset.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {assets} from '../../../services/assets.service'
@Component({
  selector: 'app-asset-list',
  imports: [MatTableModule, CommonModule],
  templateUrl: './asset-list.html',
    styleUrls: ['./asset-list.css']
})
export class AssetList {

  assets: Asset[] = assets;

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

}

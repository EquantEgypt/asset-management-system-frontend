import { Component } from '@angular/core';
import { AssetService } from '../../../services/assets.service';
import { Asset } from '../../../model/asset.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './asset-list.html',
  styleUrls: ['./asset-list.css'],
})
export class AssetList {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  categories: String[] = [];
  types: String[] = [];
  searchName: string = '';
  searchBrand: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  selectedType: string = '';
  searchUser: string = '';
  pageIndex: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  pageSizeOptions: number[] = [5, 10, 20];




  displayedColumns: string[] = [
    'id',
    'name',
    'category',
    'type',
    'assignedTo',
    'status',
    'brands',
    'Department'
  ];

  constructor(private assetService: AssetService) { }

  ngOnInit() {
    this.loadAssets();
    this.assetService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map(item => item.categoryName);
      },
      error: (err) => {
        console.error('Error fetching categories', err);
        this.categories = [];
      }
    });

    this.assetService.getTypes().subscribe({
      next: (data) => {
        this.types = data.map(item => item.typeName);
      },
      error: (err) => {
        console.error('Error fetching types', err);
        this.types = [];
      }
    });
  }



  public loadAssets() {
    const filters = {
      assetName: this.searchName,
      brand: this.searchBrand,
      category: this.selectedCategory,
      type: this.selectedType,
      status: this.selectedStatus,
      assignedUser: this.searchUser,
      page: this.pageIndex,      
      size: this.pageSize        
    };

    this.assetService.getAssets(filters).subscribe({
      next: (data: any) => {
        if (data && Array.isArray(data.content)) {
          this.assets = data.content.map((item: any) => this.mapAsset(item));
          this.filteredAssets = [...this.assets];
          this.totalElements = data.totalElements; 
        } else {
          this.assets = [];
          this.filteredAssets = [];
          this.totalElements = 0;
        }
      },
      error: (err) => {
        console.error('Error fetching assets', err);
        this.assets = [];
        this.filteredAssets = [];
        this.totalElements = 0;
      }
    });
  }



  private mapAsset(item: any): any {
    return {
      id: item.id,  
      name: item.assetName || '—',
      category: item.category || '—',
      type: item.type || '—',
      assignedTo: item.assignedUser || '—',
      status: item.status || '—',
      brand: item.brand || '—',
      Department: item.department || '—'
    };
  }
  handlePageEvent(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAssets();
  }


}

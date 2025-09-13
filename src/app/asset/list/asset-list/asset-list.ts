import { Component } from '@angular/core';
import { AssetService } from '../../../services/assets.service';
import { Asset } from '../../../model/asset.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule, MatButtonModule,    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule],
  templateUrl: './asset-list.html',
  styleUrls: ['./asset-list.css'],
})
export class AssetList {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  searchTerm: string = '';
  categories: String[] = [];
  types : String[] = [];
  searchName: string = '';
  searchBrand: string = '';
  selectedCategory: string = '';
  // selectedStatus: string = '';
  selectedType: string = '';



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
    this.assetService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map(item => item.categoryName) ;
      },
      error: (err) => {
        console.error('Error fetching categories', err);
        this.categories = [];
      }
    });

    this.assetService.getTypes().subscribe({
      next: (data) => {
        this.types = data.map(item => item.typeName) ;
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
    type: this.selectedType
  };

  this.assetService.getAssets(filters).subscribe({
    next: (data) => {
      this.assets = data.map(item => this.mapAsset(item));   // نخزن كل الأصول
      this.filteredAssets = [...this.assets];    
      console.log(this.filteredAssets );            // نظهرهم كلهم أول ما نحمل
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
    id: item.id,   // بدلاً من item.id
    name: item.assetName || '—',
    category: item.category || '—',
    type: item.type || '—',
    assignedTo: item.assignedUser ||'—',  // لسه مش راجع مع الـ DTO
    status: item.status || '—',      // برضه مش راجع مع الـ DTO
    purchaseDate: '—' // مش موجود في DTO بتاعك
  };
}

}

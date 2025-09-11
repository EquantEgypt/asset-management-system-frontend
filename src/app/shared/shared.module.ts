import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule,MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule],
    declarations: [],
    exports: [CommonModule,MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule]
})
export class SharedModule { }
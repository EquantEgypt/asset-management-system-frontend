import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@NgModule({
    imports: [CommonModule,MatTableModule, 
        MatPaginatorModule, MatFormFieldModule,
         MatSelectModule, MatProgressSpinnerModule,   ReactiveFormsModule,MatInputModule,  MatButtonModule,
    MatAutocompleteModule,  MatCardModule,RouterLink
    ],
    declarations: [],
    exports: [CommonModule,MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule
        ,  ReactiveFormsModule,MatInputModule,  MatButtonModule,
    MatAutocompleteModule,  MatCardModule,RouterLink
    ]
})
export class SharedModule { }
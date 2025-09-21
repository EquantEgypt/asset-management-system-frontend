import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { RequestView } from '../../model/request.model';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
})
export class RequestListComponent implements OnInit {
  requests: RequestView[] = [];
  isLoading = true;
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  displayedColumns: string[] = [
    'id',
    'requester',
    'requestType',
    'assetName',
    'assetType', // Added column
    'status',    // Added column
    'requestDate',
  ];

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.isLoading = true;
    this.requestService.getRequests(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        this.requests = data.content;
        this.totalElements = data.page.totalElements;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load requests', err);
        this.isLoading = false;
      },
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadRequests();
  }
}
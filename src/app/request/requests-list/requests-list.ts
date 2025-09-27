import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { AssignPerRequest, RequestView } from '../../model/request.model';
import { PageEvent } from '@angular/material/paginator';
import { SharedModule } from '../../shared/shared.module';
import { Role } from '../../model/roles.enum';
import { AuthService } from '../../services/auth.service';
import { AssignAssetForm } from '../../assign-asset-form/assign-asset-form';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-requests-list',
  imports: [SharedModule, AssignAssetForm],
  templateUrl: './requests-list.html',
  styleUrl: './requests-list.css'
})
export class RequestsList {
  requests: RequestView[] = [];
  role: Role | null = null;
  selectedStatus: string | '' = '';
  selectedType: string | '' = '';
  dataToAssign: AssignPerRequest | null = null;

  isLoading = true;
  showAssignModal = false;
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
    'action'
  ];

  constructor(private requestService: RequestService, private auth: AuthService, private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadRequests();
    this.role = this.auth.getRole();

  }


  loadRequests(): void {
    this.isLoading = true;
    this.requestService.getRequests(
      this.pageIndex,
      this.pageSize,
      this.selectedStatus,
      this.selectedType
    ).subscribe({
      next: (data) => {
        this.requests = data.content;
        this.totalElements = data.page.totalElements;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load requests', err);
        this.isLoading = false;
      }
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadRequests();
  }
  handleClose(success: boolean): void {
    this.showAssignModal = false;

    if (success) {
      this.loadRequests(); // ✅ re-fetch the list so actions update
    }
  }

  updateStatus(request: RequestView, newStatus: 'APPROVED' | 'REJECTED'): void {
    const accepted = newStatus;
    if (request.requestType === 'NEW' && newStatus == 'APPROVED') {
      console.log("the category id im sending is ", request.categoryId)
      this.dataToAssign = {
        requestId: request.id,
        userId: request.requesterId,
        userName: request.requester,
        typeName: request.assetTypeName,
        typeId: request.assetTypeId,
        categoryId: request.categoryId,
        requestType: request.requestType
      };
      this.showAssignModal = true;
    } else {
      this.requestService
        .respondToRequest(request.id, request.requestType, accepted)
        .subscribe({
          next: () => {
            request.status = newStatus;
          },
          error: (err) => {
            console.error('Failed to update request', err);
          },
        });
    }
  }

}
import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { AssignPerRequest, RequestView } from '../../model/request.model';
import { PageEvent } from '@angular/material/paginator';
import { SharedModule } from '../../shared/shared.module';
import { Role } from '../../model/roles.enum';
import { AuthService } from '../../services/auth.service';
import { AssignAssetForm } from '../../assign-asset-form/assign-asset-form';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

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
  activeTab: 'pending' | 'history' | 'my-requests' = 'pending';
  dataToAssign: AssignPerRequest | null = null;
  searchWord: string = "";

  isLoading = true;
  showAssignModal = false;
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  searchControl = new FormControl('');

  selectedRequest: any = null;
  rejectionNoteControl = new FormControl('');
  showRejectModal: boolean = false;

  displayedColumns: string[] = [
    'id',
    'requester',
    'requestType',
    // 'assetName',
    'assetType',
    'status',
    'requestDate',
    'action'
  ];

  constructor(private requestService: RequestService, private auth: AuthService
  ) { }
  ngOnInit(): void {
    this.loadRequests('pending');
    this.role = this.auth.getRole();

  }
  searchBar(text: string) {
    this.searchWord = text.toLowerCase().trim();
    this.pageIndex = 0;
    this.loadRequests(this.activeTab);
  } 

  loadRequests(type?: 'pending' | 'history' | 'my-requests'): void {
  this.isLoading = true;

  if (type) {
    this.activeTab = type;
  }

  let statuses: string[] | null = null;

  if (this.activeTab === 'pending') {
    statuses = ['PENDING'];
  } else if (this.activeTab === 'history') {
    statuses = ['APPROVED', 'REJECTED'];
  }

  const request$ = this.requestService.getRequests(
    this.pageIndex,
    this.pageSize,
    this.selectedType || null,
    this.searchWord,
    statuses,
    this.activeTab === 'my-requests'
  );

  request$.subscribe({
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
  handleClose(success: boolean): void {
    this.showAssignModal = false;

    if (success) {
      this.loadRequests();
    }
  }
  clearSearch(): void {
    this.searchControl.setValue('');
  }

  updateStatus(request: RequestView, newStatus: 'APPROVED' | 'REJECTED', rejectionNote?: string): void {
  if (request.requestType === 'NEW' && newStatus === 'APPROVED') {
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
    // Argument of type '"APPROVED" | "REJECTED"' is not assignable to parameter of type '"APPROVE" | "REJECT"'.
      .respondToRequest(request.id, newStatus, { rejectionNote })
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

  openRejectModal(request: any) {
    this.selectedRequest = request;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('rejectConfirmationModal'));
    modal.show();
  }

  closeModal() {
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('rejectConfirmationModal'));
    if (modal) {
      modal.hide();
    }
    this.selectedRequest = null;
  }


  openRejectModalSimple(request: any) {
    this.selectedRequest = request;
    this.showRejectModal = true;
  }

  closeRejectModal() {
    this.showRejectModal = false;
    this.selectedRequest = null;
  }



  confirmReject() {
    if (this.selectedRequest) {
      this.updateStatus(
        this.selectedRequest,
        'REJECTED',
        this.rejectionNoteControl.value || undefined
      );
      this.closeRejectModal();
      this.rejectionNoteControl.reset();
    }
  }

}
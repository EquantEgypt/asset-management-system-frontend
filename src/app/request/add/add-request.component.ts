import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';
import { AssetService } from '../../services/assets.service';
import { TypeService } from '../../services/assetType.service';
import { Request } from '../../model/request.model';
import { ToastService } from 'angular-toastify';
import { AssetListDTO } from '../../model/asset-list-dto.model';
import { Type } from '../../model/AssetTypeModel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RequestType } from '../../model/request-type.enum';
import { AssetFilter } from '../../model/asset-filter.model';

@Component({
  selector: 'app-add-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css'],
})
export class AddRequestComponent implements OnInit {
  @Input() userId: number | null = null;
  @Input() userName: string | null = null;
  @Output() closeModal = new EventEmitter<void>();
  requestForm: FormGroup;
  assets: AssetListDTO[] = [];
  filteredAssets: AssetListDTO[] = [];
  types: Type[] = [];
  errorMessage: string = '';
  note: string | null = null;
  isLoading = false;
  requestTypes = Object.values(RequestType);


  private destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private assetService: AssetService,
    private typeService: TypeService,
    private router: Router,
    private toast: ToastService,
    private authService: AuthService
  ) {
    this.requestForm = this.fb.group({
      assetId: this.fb.control<number | null>(null),
      assetTypeId: this.fb.control<number | null>(null, { validators: Validators.required }),
      requestType: this.fb.control<RequestType | null>(null, { validators: Validators.required }),
      notes: this.fb.control<string | null>(null),
    });
  }

  ngOnInit(): void {
    this.loadAssets();
    this.loadTypes();

    this.requestForm.get('requestType')?.valueChanges.subscribe((type) => {
      this.updateValidators(type);
    });

    this.requestForm.get('assetTypeId')?.valueChanges.subscribe((typeId) => {
      const requestType = this.requestForm.get('requestType')?.value;

      if (typeId && requestType === 'MAINTENANCE') {
        const selectedType = this.types.find((t) => t.id === Number(typeId));

        if (selectedType) {
          this.filteredAssets = this.assets.filter(
            (asset) => asset.type?.toLowerCase() === selectedType.name?.toLowerCase()
          );
        } else {
          this.filteredAssets = [];
        }
      } else {
        this.filteredAssets = [];
      }

      this.requestForm.get('assetId')?.reset();
    });
  }

  onCancel(): void {
    if (this.isLoading) return;
    this.closeModal.emit();
  }

  updateValidators(requestType: string): void {
    const assetIdControl = this.requestForm.get('assetId');
    const assetTypeIdControl = this.requestForm.get('assetTypeId');

    assetIdControl?.clearValidators();
    assetTypeIdControl?.clearValidators();

    if (requestType === 'NEW') {
      assetTypeIdControl?.setValidators([Validators.required]);
    } else if (requestType === 'MAINTENANCE') {
      assetTypeIdControl?.setValidators([Validators.required]);
      assetIdControl?.setValidators([Validators.required]);
    }

    assetIdControl?.updateValueAndValidity();
    assetTypeIdControl?.updateValueAndValidity();
  }

  loadAssets(): void {
    const filter: AssetFilter = {
      page: 0,
      size: 100,
    };
    filter.myAssetsFlag = true;

    this.assetService
      .getAssets(filter)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.assets = data?.content ?? [];
        },
        error: (err) => {
          console.error('Failed to load assets:', err);
          this.assets = [];
          this.toast.error('Could not load assets. Please try again later.');
        },
      });
  }

  loadTypes(): void {
    this.typeService
      .getTypes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.types = data ?? [];
        },
        error: (err) => {
          console.error('Failed to load asset types:', err);
          this.types = [];
          this.toast.error('Could not load asset types. Please try again later.');
        },
      });
  }

  onSubmit(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    let currentUserId: number | null = null;
    if (this.userId === null) {
      // currentUserId = this.authService.getCurrentUserId();
    } else {
      currentUserId = this.userId;
    }

    const formValue = this.requestForm.value;
    const requestData: Request = {
      ...formValue,
      requesterId: currentUserId,
    };

    this.requestService.addRequest(requestData).subscribe({
      next: () => {
        this.isLoading = false;
        this.toast.success('Request added successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to add request. Please try again.';
        this.toast.error(this.errorMessage);
        console.error('Request submission failed:', err);
      },
    });
  }
}

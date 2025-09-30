import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';
import { AssetService } from '../../services/assets.service';
import { TypeService } from '../../services/assetType.service';
import { Request } from '../../model/request.model';
import { ToastService } from 'angular-toastify';
import { Asset } from '../../model/asset.model';
import { Type } from '../../model/AssetTypeModel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MiniAsset } from '../../model/MiniAsset.model';

@Component({
  selector: 'app-add-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {
      @Input() userId: number | null = null;
  @Input() userName: string | null = null;
  @Output() closeModal = new EventEmitter<void>();
  requestForm: FormGroup;
  assets: MiniAsset[] = [];
  filteredAssets: MiniAsset[] = [];
  types: Type[] = [];
  requestTypes = ['NEW', 'MAINTENANCE'];
  errorMessage: string | null = null;
  note:string |null = null;
  isLoading = false;

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
  requestType: this.fb.control<'NEW' | 'MAINTENANCE' | null>(null, { validators: Validators.required }),
  note: this.fb.control<string | null>(null),
});

  }

  ngOnInit(): void {
    this.loadAssets();
    this.loadTypes();
    console.log(this.userId);
    console.log(this.userName);
    this.requestForm.get('requestType')?.valueChanges.subscribe(type => {
      this.updateValidators(type);
    });

    this.requestForm.get('assetTypeId')?.valueChanges.subscribe(typeId => {
      if (typeId && this.requestForm.get('requestType')?.value === 'MAINTENANCE') {
        console.log(typeId);
        console.log(this.types)
        console.log(this.types.find(type => type.id == Number(typeId))!.name);
        this.filteredAssets = this.assets.filter(asset => asset.type === this.types.find(type => type.id == Number(typeId))!.name);
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
  const filter: any = {};
  if (this.userName) {
    filter.assignedUser = this.userName;
    console.log(this.userName);
  }
  this.assetService.getAssets(filter)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(data => {
      console.log(filter);
      console.log(data);
      this.assets = data.content;
    });
}


  loadTypes(): void {
    this.typeService.getTypes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => this.types = data);
  }

  onSubmit(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    let currentUserId: number | null = null;
    if (this.userId === null) {
      // currentUserId = this.authService.getCurrentUserId();
    } else {
      currentUserId = this.userId;
    }
    const formValue = this.requestForm.value;
    const requestData: Request = {
      ...formValue,
      requesterId: currentUserId
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
        if (this.errorMessage) {
          this.toast.error(this.errorMessage);
        }
        console.error(err);
      }
    });
  }
}
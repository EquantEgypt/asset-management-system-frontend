import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Asset } from '../model/asset.model';
import { UserService } from '../services/user.service';
import { AssetService } from '../services/assets.service';
import { AuthService } from '../services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { AssignAssetService } from '../services/assign.asset.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-assign-asset-form',
  imports: [SharedModule,ReactiveFormsModule],
  templateUrl: './assign-asset-form.html',
  styleUrl: './assign-asset-form.css'
})
export class AssignAssetForm {
  @Input() userId: number | null = null;
  @Input() userName: string | null = null;
  @Output() closeModal = new EventEmitter<void>();
  assets: Asset[] = [];
    constructor(private userService: UserService, private assetService: AssetService, private assign: AssignAssetService,    private toast: ToastService
    ) { }
   assignForm = new FormGroup({
    assetId: new FormControl('', Validators.required),
    assignmentDate: new FormControl(new Date().toISOString().split('T')[0], Validators.required),

    returnDate: new FormControl(''),
    note: new FormControl('')
  }); 
  ngOnInit() {
    this.loadAvailableAssets();
  }

  loadAvailableAssets() {
    this.assetService.getAvAssets().subscribe({
      next: (assets) => {this.assets = assets;
        console.log(assets)
      },
      error: (err) => console.error('Error loading assets', err)
    });
  }
  onClose() {
    this.closeModal.emit();
  }
   onSubmit() {
    if (this.assignForm.valid && this.userId) {
     const formData = {
      assetId: Number(this.assignForm.value.assetId), 
      userId: this.userId,
      assignmentDate: this.assignForm.value.assignmentDate!,
      returnDate: this.assignForm.value.returnDate || undefined,
      note: this.assignForm.value.note || undefined
    };
      console.log('Assignment data:', formData);

this.assign.assignAsset(formData).subscribe({


      next: () => {
                this.toast.success('Asset assigned successfully');

        console.log('Asset assigned successfully');
        this.onClose();
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
  }
}


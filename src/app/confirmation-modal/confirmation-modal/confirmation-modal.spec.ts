import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Asset } from '../../model/asset.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.css'
})
export class ConfirmationModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { user: User | null; asset: Asset | null; formValue: any }
  ) {}
}

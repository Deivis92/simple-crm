import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-dialog-edit-address',
  imports: [CommonModule, MatProgressBarModule, MatDialogModule, MatFormFieldModule, MatButtonModule, FormsModule, MatInputModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {

  constructor(public firestoreService: FirestoreService, public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

  user: User = new User();
  loading = false;

  saveUser() {
    if (this.user.id) {
      this.loading = true;
      this.firestoreService.updateUser(this.user).then(() => {
        this.dialogRef.close();
      }).catch((error) => {
        console.error('Fehler beim Aktualisieren des Benutzers:', error);
      }).finally(() => {
        this.loading = false;
      });
    } else {
      console.error('Benutzer-ID fehlt!');
    }
  }
}

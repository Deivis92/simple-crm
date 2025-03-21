import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, FormsModule, MatProgressBarModule],
  templateUrl: './dialog-add-user.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './dialog-add-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class DialogAddUserComponent {

  user = new User();
  birthDate?: Date;
  loading = false;


  constructor(public firestoreService: FirestoreService,  public dialogRef: MatDialogRef<DialogAddUserComponent> ) { }

  saveUser() {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
      this.loading = true;
    }

    this.firestoreService.addUser(this.user).then((id) => {
      this.loading = false;
      this.dialogRef.close();
      console.log('User added to Firestore with ID:', id);
    }).catch((error) => {
      this.loading = false; 
      console.error('Error saving user:', error);
    });
  }
}

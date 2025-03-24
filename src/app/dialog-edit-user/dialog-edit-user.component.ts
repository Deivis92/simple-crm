import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';



@Component({
  selector: 'app-dialog-edit-user',
  imports: [CommonModule, MatProgressBarModule, MatDialogModule, MatFormFieldModule, MatButtonModule, FormsModule, MatInputModule, MatDatepickerModule ],
  templateUrl: './dialog-edit-user.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './dialog-edit-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogEditUserComponent {

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {}

  user: User = new User();
  loading = false;
  birthDate?: Date;

  saveUser() {}


}

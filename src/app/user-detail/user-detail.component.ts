import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  imports: [
    MatCardModule,
    MatIcon,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId: string = '';
  user: any = {};

  constructor(
    private route: ActivatedRoute,
    public firestoreService: FirestoreService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id') ?? '';
      console.log('Got ID', this.userId);

      if (this.userId) {
        this.firestoreService.getUser(this.userId).subscribe((user) => {
          this.user = user;
        });
      }
    });
  }



  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);

    dialog.componentInstance.user = { ...this.user };
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.user = result;
      }
    });
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = { ...this.user };
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.user = result;  
      }
    });
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';


@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {



  userId: string = '';
  user: any = {};


  constructor(private route: ActivatedRoute, public firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') ?? '';
      console.log('Got ID', this.userId);
      
      if (this.userId) {
        this.firestoreService.getUser(this.userId).subscribe(user => {
          this.user = user;
        });
      }
    });
  }
  }



import { inject, Injectable, Injector } from '@angular/core';
import { collection, Firestore, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { runInInjectionContext } from '@angular/core';  // Import the standalone function

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  constructor() {}

  async addUser(user: User): Promise<string | undefined> {
    return runInInjectionContext(this.injector, async () => { 
      try {
        const usersCollection = collection(this.firestore, 'users');
        const docRef = await addDoc(usersCollection, {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          birthDate: user.birthDate,
          street: user.street,
          zipCode: user.zipCode,
          city: user.city,
        });
  
        console.log('User added with ID:', docRef.id);
        return docRef.id;
      } catch (error) {
        console.error('Error adding user:', error);
        return undefined;
      }
    });
  }
  
  getUsers(): Observable<User[]> {
    return runInInjectionContext(this.injector, () => { 
      const usersCollection = collection(this.firestore, 'users');
      return collectionData(usersCollection, { idField: 'id' }) as Observable<User[]>;
    });
  }
}

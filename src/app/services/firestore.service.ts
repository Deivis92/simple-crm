import { inject, Injectable } from "@angular/core";
import { collection, Firestore, addDoc } from "@angular/fire/firestore";
import { User } from "../../models/user.class";

@Injectable({
    providedIn: 'root'
})

export class FirestoreService {

    firestore = inject(Firestore)


    constructor() {

    }
    async addUser(user: User): Promise<string | undefined> {
        try {
          const usersCollection = collection(this.firestore, 'users');
          const docRef = await addDoc(usersCollection, {
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            street: user.street,
            zipCode: user.zipCode,
            city: user.city
          });
    
          console.log('User hinzugefügt mit ID:', docRef.id);
          return docRef.id;
        } catch (error) {
          console.error('Fehler beim Hinzufügen des Benutzers:', error);
          if (error instanceof Error) {
            console.error('Fehlermeldung:', error.message);
          }
          return undefined;
        }
    }





}
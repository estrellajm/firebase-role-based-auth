import { Component } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';
import { navs } from './main/layout/sidebar/nav';

interface Item {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  item$: Observable<Item[]>;
  navs = navs;
  constructor(firestore: Firestore, public auth: AuthService) {
    const coll = collection(firestore, 'items');
    this.item$ = collectionData(coll) as Observable<Item[]>;
  }
}

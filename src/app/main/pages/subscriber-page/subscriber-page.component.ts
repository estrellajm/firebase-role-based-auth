import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';

interface Post {
  title?: string;
  content?: string;
}
@Component({
  selector: 'cc-subscriber-page',
  templateUrl: './subscriber-page.component.html',
  styleUrls: ['./subscriber-page.component.scss'],
})
export class SubscriberPageComponent implements OnInit {
  postRef: AngularFirestoreDocument<Post>;
  post$: Observable<Post | undefined>;
  user: any;

  constructor(private afs: AngularFirestore, public auth: AuthService) {
    this.auth.user$.subscribe((user: any) => (this.user = user));
  }

  ngOnInit(): void {
    this.postRef = this.afs.doc('posts/testPost');
    this.post$ = this.postRef.valueChanges();
  }

  editPost() {
    this.postRef.update({ title: 'Edited Title!' });
  }

  deletePost() {
    this.postRef.delete();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authSub: Subscription
  loading: boolean = false;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.loading = true;
    // this.authSub = this.auth.user$.subscribe(user => console.log(user))
  }

  ngOnDestory() {
    this.authSub.unsubscribe()
  }
}

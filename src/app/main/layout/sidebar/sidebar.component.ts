import { Component, OnInit } from '@angular/core';
import { navs } from './nav';

@Component({
  selector: 'cc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  navs = navs;
  constructor() {}

  ngOnInit(): void {}
}

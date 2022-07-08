import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AddItem, RemoveItem } from '@stores/sorter/sorter.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'cc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Select() sorter$: Observable<any> | undefined;

  public value: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {}

  addItem() {
    this.store.dispatch(new AddItem(this.value));
  }
  removeItem(i: number) {
    this.store.dispatch(new RemoveItem(i));
  }
}

import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import * as fromActions from './sorter.actions';

export interface SorterStateModel {
  items: string[];
}

const defaults: SorterStateModel = {
  items: ['sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf', 'sdf'],
};

@State<SorterStateModel>({
  name: 'sorter',
  defaults,
})
@Injectable()
export class SorterState {
  @Action(fromActions.AddItem)
  addItem(
    { getState, setState }: StateContext<SorterStateModel>,
    { payload }: fromActions.AddItem
  ) {
    const state = getState();
    setState({ items: [...state.items, payload] });
  }
  @Action(fromActions.RemoveItem)
  removeItem(
    { getState, setState }: StateContext<SorterStateModel>,
    { index }: fromActions.RemoveItem
  ) {
    const newState = getState().items.filter((items, i) => i !== index);
    console.log(index);
    console.log(newState);
    setState({ items: newState });
  }
}

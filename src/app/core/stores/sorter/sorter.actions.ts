export class AddItem {
  static readonly type = '[SORTER] Add Item';
  constructor(public payload: string) { }
}
export class RemoveItem {
  static readonly type = '[SORTER] Remove Item';
  constructor(public index: number) { }
}

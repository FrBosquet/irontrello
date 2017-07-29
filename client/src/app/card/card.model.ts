import { SortableItem } from './../shared/interfaces';
import { List } from './../list/list.model';

// Lesson 3: Implement the Card model
export class Card implements SortableItem{
    _id:string;
    title: string;
    position:number;
    dueDate:Date;
    constructor({_id,title,position,dueDate}) {
      this._id = _id;
      this.title = title;
      this.position = position;
      this.dueDate = dueDate
    }

    setList(id) {

    }
}

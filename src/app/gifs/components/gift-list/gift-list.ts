import { Component, input } from '@angular/core';
import { GiftListItem } from "./gift-list-item/gift-list-item";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gift-list',
  imports: [GiftListItem],
  templateUrl: './gift-list.html',
})
export class GiftList {

  gifs =  input.required<Gif[]>();
}

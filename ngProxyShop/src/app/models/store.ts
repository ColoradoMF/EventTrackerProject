import { ItemToBuy } from "./item";

export class Store {
  id: number;
  name: string;
  description: string;
  logoImageUrl: string;
  itemsToBuy: ItemToBuy[];

  constructor(
  id: number = 0,
  name: string = '',
  description: string = '',
  logoImageUrl: string = '',
  itemsToBuy: ItemToBuy[] = []
  ){
  this.id = id;
  this.name  = name;
  this.description  = description;
  this.logoImageUrl  = logoImageUrl;
  this.itemsToBuy = itemsToBuy;
  }

}

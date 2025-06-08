import { Store } from "./store";
import { User } from "./user";

export class ItemToBuy {

  id: number;
  name: string;
  description: string;
  imageUrl: string;
  sku: string;
  lastPurchased: string;
  needed: boolean;
  store: Store;
  user: User;

  constructor(
    id: number = 0,
    name: string = '',
    description: string = '',
    imageUrl: string = '',
    sku: string = '',
    lastPurchased = '',
    needed = false,
    store: Store = new Store(),
    user: User = new User(),
  ){
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.sku = sku;
    this.lastPurchased = lastPurchased;
    this.needed = needed;
    this.store = store;
    this.user = user;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreService } from '../../services/store-service';
import { ItemToBuyService } from '../../services/item-service';
import { Store } from '../../models/store';
import { ItemList } from '../item-list/item-list';
import { StoreList } from '../store-list/store-list';
import { ItemToBuy } from '../../models/item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, FormsModule, StoreList, ItemList,],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  stores: Store[] = [];
  items: ItemToBuy[] = [];

  constructor(
    private storeService: StoreService,
    private itemService: ItemToBuyService
  ) {}


  ngOnInit(): void {
    this.loadStores();
    this.loadItems();
  }

  loadStores(): void {
    this.storeService.index().subscribe({
      next: (storeList) => {
        this.stores = storeList;
      },
      error: (nobueno) => {
        console.error('Home.loadStores: error getting stores');
        console.error(nobueno);
      }
    });
  }

  loadItems(): void {
    this.itemService.index().subscribe({
      next: (itemsList) => {
        this.items = itemsList;
      },
      error: (nobueno) => {
        console.error('Home.loadItems: error getting items');
        console.error(nobueno);
      }
    });
  }

  displayStore(store: Store): void {

  }


}

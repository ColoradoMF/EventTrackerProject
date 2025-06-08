import { StoreService } from './../../services/store-service';
import { Component, OnInit } from '@angular/core';
import { Store } from '../../models/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-store-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './store-list.html',
  styleUrls: ['./store-list.css']
})
export class StoreList implements OnInit {
  title: string = 'ngProxyShop';

  stores: Store[] = [];
  selected: Store | null = null;
  showAddForm: boolean = false;
  newStore: Store = new Store();
  editStore: Store | null = null;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores():void {
    this.storeService.index().subscribe({
      next: (stores) => {
        this.stores = stores;
      },
      error: (nobueno) => {
        console.log(nobueno);
        console.error('Store-list.ts Component: Error loading stores');
      }
    });
  }

  displayStore(store: Store): void {
    this.selected = store;
  }

  displayTable(): void {
    this.selected = null;
  }

  toggleDetails(store: Store): void {
    this.selected = this.selected?.id === store.id ? null : store;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.selected = null;
    this.editStore = null;
  }

  addStore(): void {
    this.storeService.create(this.newStore).subscribe({
      next: () => {
        this.loadStores();
        this.newStore = new Store();
        this.showAddForm = false;
      },
      error: err => console.error('Error creating store', err)
    });
  }

  setEditStore(store: Store): void {
    console.log('Editing store', store);
    this.editStore    = { ...store }; // shallow copy
    this.selected     = null;         // hide details
    this.showAddForm  = false;        // hide add form
  }

  updateStore(): void {
    if (!this.editStore) return;
    this.storeService.update(this.editStore).subscribe({
      next: () => {
        this.loadStores();
        this.editStore = null;
      },
      error: err => console.error('StoreList.updateStore():', err)
    });
  }

  deleteStore(id: number): void {
    this.storeService.delete(id).subscribe({
      next: () => this.loadStores(),
      error: err => console.error('StoreList.deleteStore():', err)
    });
  }



}

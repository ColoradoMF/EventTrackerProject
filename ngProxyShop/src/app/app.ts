import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./components/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ngProxyShop';

  view: 'stores' | 'items' = 'stores';

  showStores() { this.view = 'stores'; }
  showItems()  { this.view = 'items'; }
}

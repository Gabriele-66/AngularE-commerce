import { Component, OnInit } from '@angular/core';

import { Product } from '../model/product';
import { ListService } from '../services/list.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  public products: Product[] = [];
  first = 0;
  rows = 5;

  constructor(private listService: ListService) {
    this.getProducts();
  }

  ngOnInit() {}

  getProducts() {
    this.listService.getProducts().subscribe(
      (prod) => (this.products = prod),
      () => alert('GET USER ERROR')
    );
  }

  next() {
    this.getProducts();
    this.first += this.rows;
  }

  prev() {
    this.getProducts();
    this.first -= this.rows;
  }

  reset() {
    this.getProducts();
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.products
      ? (this.first === this.products.length - this.rows)
      : true;
  }

  isFirstPage(): boolean {
    return this.products ? this.first === 0 : true;
  }
}

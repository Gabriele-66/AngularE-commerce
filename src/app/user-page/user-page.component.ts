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
  selectedProducts?: Product[];

  constructor(private listService: ListService) {
    this.getProducts();
    this.isRowSelectable = this.isRowSelectable.bind(this);
  }

  ngOnInit() {}

  getProducts() {
    this.listService.getProducts().subscribe(
      (prod) => {
        this.products = prod;
      },
      () => alert('GET USER ERROR')
    );
  }

  next() {
    this.getProducts();
    this.first = this.first + this.rows;
  }

  prev() {
    this.getProducts();
    this.first = this.first - this.rows;
  }

  reset() {
    this.getProducts();
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.products
      ? this.first === this.products.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.products ? this.first === 0 : true;
  }

  isRowSelectable(prod: Product) {
    if (Number(prod.quantity) > 0) {
      return false;
    }
    return true;
    //return false ? Number(prod.quantity)>0 : true;
  }
  stampa() {
    console.log(this.first)
    console.log(this.rows)
    console.log(this.selectedProducts)
  }
}

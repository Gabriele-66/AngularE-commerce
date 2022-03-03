import { Component, OnInit } from '@angular/core';

import { Product } from '../model/product';
import { ListService } from '../services/list.service';

import { Table } from 'primeng/table';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  public products: Product[] = [];
  first = 0;
  rows = 5;
  pricesValues: number[] = [];

  constructor(private listService: ListService) {
    this.getProducts();
  }

  ngOnInit() {}

  getProducts() {
    let priceNum:number[] = [];
    this.listService.getProducts().subscribe(
      (prod) => {
        this.products = prod;
        priceNum = [];
        prod.forEach((product) => priceNum.push(Number(product.price)));
        this.pricesValues.push(Math.min.apply(null, priceNum));
        this.pricesValues.push(Math.max.apply(null, priceNum));
      },
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
      ? this.first === this.products.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.products ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }

}

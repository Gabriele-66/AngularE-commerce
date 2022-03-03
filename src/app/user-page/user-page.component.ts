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
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    if (this.first+this.rows >= this.products.length)
      return true
    return false
  }

  isFirstPage(): boolean {
    return true ? this.first === 0 : false;
  }

  isRowSelectable(prod: Product) {
    if (Number(prod.quantity) > 0) {
      return false;
    }
    return true;
    //return false ? Number(prod.quantity)>0 : true;
  }
}

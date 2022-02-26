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

  constructor(private listService: ListService) {
   // this.listService.getProducts();
    this.products = this.listService.getUpdateProducts();
  }

  ngOnInit() {
    //this.listService.getProducts();
    this.products = this.listService.getUpdateProducts();
  }

}

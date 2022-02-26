import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  public products: Product[] = [];
  public currentRoute!: string;
  newProd: Product = {};

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getProducts().then((data) => {
      this.products = data;
      this.products.forEach((prod) => (prod.editable = 'edit'));
    });
  }

  edit(id: string) {
    console.log(id);
    this.products.forEach((prod) => {
      if (prod.id == id) {
        if (prod.editable == 'edit') {
          prod.editable = 'confirm';
        } else {
          prod.editable = 'edit';
        }
        return;
      }
    });
  }

  delete(id: string) {
    this.products = this.products.filter((prod) => prod.id != id);
  }

  addProd() {
    this.newProd.name = '';
    this.newProd.description = '';
    this.newProd.price = 0;
    this.newProd.quantity = 0;
    this.newProd.inventoryStatus = '';
    this.newProd.editable = 'confirm';
    this.newProd.id = '';
    this.newProd.code = '';

    console.log(this.newProd);

    console.log(this.products.length);

    this.products.push(this.newProd);

    console.log(this.products);
  }
}

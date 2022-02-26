import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private URL = 'assets/products.json';

  public products: Product[] = [];
  private resultSearch: any[] = [];
  private productsName: any[] = [];
  private newProd: Product = {};

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<any>(this.URL)
      .toPromise()
      .then((res) => <Product[]>res.data)
      .then((data) => {
        // return data;
        this.products = data;
        this.products.forEach((prod) => (prod.editable = 'edit'));
      });
  }

  getUpdateProducts() {
    return this.products;
  }

  search(textBar: string) {
    this.productsName = [];
    this.resultSearch = [];

    if (textBar.length) {
      this.products.forEach((product) =>
        this.productsName.push(product.name?.toLowerCase())
      );

      for (let i = 0; i < this.productsName.length; i++) {
        if (this.productsName[i].includes(textBar)) {
          this.resultSearch.push(this.productsName[i]);
        }
      }
      return this.resultSearch;
    } else {
      return [];
    }
  }

  edit(id: string) {
    //console.log(id);
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
    return this.products;
  }

  delete(id: string) {
    this.products = this.products.filter((prod) => prod.id != id);
    return this.products;
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

    //console.log(this.newProd);
    console.log(this.products.length);
    this.products.splice(0, 0, this.newProd);
    console.log(this.products.length);
    //console.log(this.products);
    return this.products;
  }
}

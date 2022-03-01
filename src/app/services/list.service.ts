import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private myUrl = 'http://localhost:3000/data';

  public products: Product[] = [];
  private resultSearch: any[] = [];
  private productsName: any[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myUrl}`);
  }

  delete(id?: string) {
    return this.http.delete<any>(`${this.myUrl}/${id}`);
  }

  edit(prod?: Product) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    if (prod?.editable == 'edit') {
      return fetch(`${this.myUrl}/${prod?.id}`, {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify({
          editable: 'confirm',
        }),
        redirect: 'follow',
      })
        .then((result) => console.log(result.text()))
        .catch((error) => console.log('error', error));
    } else if (prod?.editable == 'confirm') {
      /*  return this.http.patch(`${this.myUrl}/${prod?.id}/`, {
        editable: 'edit',
      });
      */
      return fetch(`${this.myUrl}/${prod?.id}`, {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify({
          editable: 'edit',
        }),
        redirect: 'follow',
      })
        .then((result) => console.log(result.text()))
        .catch((error) => console.log('error', error));
    }
    return;
  }

  addProd() {
    var newProd = <Product>{};
    if (this.products[0] && this.products[0].id) {
      newProd.id = (parseInt(this.products[0].id) + 1).toString();
    } else {
      newProd.id = '0';
    }
    newProd.editable = 'confirm';
    this.products.splice(0, 0, newProd);
    return this.products;
  }

  addProd1() {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      code: '',
      name: '',
      description: '',
      price: 20,
      category: '',
      quantity: 0,
      editable: 'confirm',
    });

    fetch('http://localhost:3000/data/', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }

  search(textBar: string) {
    this.getProducts().subscribe((prod) => (this.products = prod));
    console.log(this.products);
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
      console.log(this.resultSearch);
      return this.resultSearch;
    } else {
      return [];
    }
  }
}
/*
  delete(prod: Product) {
    fetch(`http://localhost:3000/data/${prod.id}`, {
      method: 'DELETE',
      redirect: 'follow',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }


*/


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get<Product[]>(this.myUrl);
  }

  search(textBar: string) {
    this.getProducts().subscribe((prod) => (this.products = prod));
    console.log(this.products)
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
      console.log(this.resultSearch)
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

  edit1(prod: Product): Observable<Product[]> {
    return this.http.put<Product[]>(
      `http://localhost:3000/data/${prod.id}`,
      prod
    );
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

  delete(id?: string) {
    return this.http.delete<any>(`http://localhost:3000/data/${id}`);
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
      }).then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
    }

}



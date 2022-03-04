import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private myUrl = '/assets/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myUrl}`);
  }

  delete(id?: string) {
    return this.http.delete<any>(`${this.myUrl}/${id}`);
  }

  edit(prod?: Product) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    if (prod?.editable == 'edit') {
      return (
        fetch(`${this.myUrl}/${prod?.id}`, {
          method: 'PATCH',
          headers: myHeaders,
          body: JSON.stringify({
            editable: 'confirm',
          }),
          redirect: 'follow',
        })
          //.then((result) => console.log(result.text()))
          .catch((error) => console.log('error', error))
      );
    } else if (prod?.editable == 'confirm') {
      /*    return this.http.patch(`${this.myUrl}/${prod?.id}/`, {
            editable: 'edit',
          });
      */
      return (
        fetch(`${this.myUrl}/${prod?.id}`, {
          method: 'PATCH',
          headers: myHeaders,
          body: JSON.stringify({
            editable: 'edit',
            code: `${prod.code}`,
            name: `${prod.name}`,
            description: `${prod.description}`,
            price: `${prod.price}`,
            quantity: `${prod.quantity}`,
          }),
          redirect: 'follow',
        })
          //.then((result) => console.log(result.text()))
          .catch((error) => console.log('error', error))
      );
    }
    return;
  }

  addProd() {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    return fetch(`${this.myUrl}`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        code: '',
        name: '',
        description: '',
        price: 15,
        quantity: 73,
        inventoryStatus: 'INSTOCK',
        editable: 'confirm',
      }),
      redirect: 'follow',
    })
      .then((result) => console.log(result.text()))
      .catch((error) => console.log('error', error));
  }
}

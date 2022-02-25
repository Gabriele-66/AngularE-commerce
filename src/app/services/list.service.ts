import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event, RouterEvent, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';

import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private URL = 'assets/products.json';
  public currentRoute!: string;

  constructor(private http: HttpClient, private router: Router) {}

  getProducts() {
    return this.http
      .get<any>(this.URL)
      .toPromise()
      .then((res) => <Product[]>res.data)
      .then((data) => {
        return data;
      });
  }

  whereAmI(): Observable<RouterEvent> {
    return this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    );
  }
}
/*


      .subscribe((e: RouterEvent) => {
      this.currentRoute = e.url;
      console.log(this.currentRoute)
    });
*/

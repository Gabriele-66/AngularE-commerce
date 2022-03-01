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

  constructor(private listService: ListService) {
    this.getProducts();
  }

  ngOnInit() {}

  getProducts() {
    this.listService.getProducts().subscribe(
      (prod) => (this.products = prod),
      () => alert('GET ADMIN ERROR')
    );
  }

  edit(prod: Product) {
    this.listService.edit(prod)
      ?.then(() => this.getProducts())
      .catch((error) => console.log('error', error));
  }

  delete(prod: Product) {
    this.listService.delete(prod.id).subscribe(
      () => this.getProducts(),
      () => alert('DELTE ERROR')
    );
  }

  add() {
    this.listService.addProd()
      .then(()=>this.getProducts())
      .catch((error) => console.log('error', error));
  }
}

/*
  delete(prod: Product) {
    this.listService.delete(prod.id).subscribe(
      (data) =>
        this.listService.getProducts().subscribe(
          (prod) => (this.products = prod),
          (err) => {
            alert('qeffqqe');
          }
        ),
      (er) => {
        alert('wwefwfw');
      }
    );
  }*/

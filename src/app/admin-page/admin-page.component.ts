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

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.listService.getProducts().subscribe(
      (prod) => (this.products = prod),
      () => alert('GET ADMIN ERROR')
    );
  }

  edit(prod: Product) {
    this.listService.edit(prod);
    this.getProducts();
  }

  delete(prod: Product) {
    this.listService.delete(prod.id).subscribe(
      () => this.getProducts(),
      () => alert('DELTE ERROR')
    );
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

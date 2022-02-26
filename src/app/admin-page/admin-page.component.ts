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

  constructor(private listService: ListService) {
    this.products = this.listService.products;
  }

  ngOnInit() {
    this.products = this.listService.products;
  }

  edit(id: string) {
    this.products = this.listService.edit(id);
  }

  delete(id: string) {
    this.products = this.listService.delete(id);
  }
}

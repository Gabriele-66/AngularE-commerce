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

  constructor(private listService: ListService) {
    this.products = this.listService.getUpdateProducts();
  }

  ngOnInit() {
    // this.listService.getProducts();
    this.products = this.listService.getUpdateProducts();
  }

  edit(id: string) {
    this.products = this.listService.edit(id);
  }

  delete(id: string) {
    this.products = this.listService.delete(id);
  }
}

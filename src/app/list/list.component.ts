import {Component, Input, OnInit} from '@angular/core';
import {ListService} from '../services/list.service';
import {Product} from '../model/product';
import {PrimeNGConfig} from 'primeng/api';
import { Event, RouterEvent, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public products: Product[] = [];
  public currentRoute!: string;
  newProd: Product = {} ;

  constructor(
    private listService: ListService,
    private primengConfig: PrimeNGConfig,
    public router: Router
  ) {
    router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof RouterEvent))
      .subscribe((e: RouterEvent) => {
        this.currentRoute = e.url;
      });
  }

  ngOnInit() {
    this.listService.getProducts().then((data) => {
      this.products = data;
      this.products.forEach((prod) => (prod.editable = 'edit'));
    });
    this.primengConfig.ripple = true;
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
    this.newProd.name = ""
    this.newProd.description = ""
    this.newProd.price = 0
    this.newProd.quantity = 0
    this.newProd.inventoryStatus=""
    this.newProd.editable ='confirm';
    this.newProd.id=""
    this.newProd.code = '';


    console.log(this.newProd)

    console.log(this.products.length)

    this.products.push(this.newProd)

    console.log(this.products);

  }
}

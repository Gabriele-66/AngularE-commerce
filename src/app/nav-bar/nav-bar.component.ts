import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { ListService } from '../services/list.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent implements OnInit {
  constructor(
    private router: Router,
    private listService: ListService
  ) {}

  products: Product[] = [];
  resultSearch: any[] = [];
  productsName: any[] = [];
  items!: MenuItem[];

  ngOnInit() {
    this.listService.getProducts().then((data) => (this.products = data));//da modificare questo finto richiamo

    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Info',
            icon: 'pi pi-fw pi-users',
          },
        ],
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.router.navigate(['login']),
      },
    ];

    if (String(this.listService.whereAmI()) == '/admin') {
      this.items.splice(1, 0, {
        label: 'Add',
        icon: 'pi pi-fw pi-calendar-plus',
      });
    }
  }



  search(textBar: string) {
    console.log(textBar.length);
    this.listService.getProducts().then((data) => (this.products = data));  // da fixare con il finto richiamo di sopra

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
    }
  }
}

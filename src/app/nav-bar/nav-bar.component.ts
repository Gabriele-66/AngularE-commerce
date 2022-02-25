import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ListService } from '../services/list.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    public router: Router,
    public appComponent: AppComponent,
    public liService: ListService
  ) {}

  products: Product[] = [];
  resultSearch: any[] = [];
  productsName: any[] = [];
  items!: MenuItem[];

  ngOnInit() {
    this.liService.getProducts().then((data) => (this.products = data));
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

    //console.log(this.appComponent.currentRoute);

    if (this.appComponent.currentRoute == '/admin') {
      this.items.splice(1, 0, {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Save',
            icon: 'pi pi-fw pi-calendar-minus',
          },
          {
            label: 'Add',
            icon: 'pi pi-fw pi-calendar-plus',
          },
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
          },

          {
            label: 'Delete',
            icon: 'pi pi-fw pi-calendar-times',
          },
        ],
      });
    }
  }

  search(textBar: string) {
    console.log(textBar.length);
    this.liService.getProducts().then((data) => (this.products = data));

    this.productsName = [];
    this.resultSearch = [];

    if (textBar.length) {
      this.products.forEach((product) =>
        this.productsName.push(product.name?.toLowerCase())
      );
      //console.log(this.productsName);

      for (let i = 0; i < this.productsName.length; i++) {
        if (this.productsName[i].includes(textBar)) {
          this.resultSearch.push(this.productsName[i]);
        }
      }

      //console.log(this.resultSearch);
    }
  }
}

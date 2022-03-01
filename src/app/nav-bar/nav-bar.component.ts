import { Component, OnInit } from '@angular/core';
import { Event, RouterEvent, Router } from '@angular/router';
import { filter } from 'rxjs';

import { MenuItem } from 'primeng/api';

import { ListService } from '../services/list.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  items!: MenuItem[];
  currentRoute!: string;
  resultSearch?: any[] = [];
  productsName: any[] = [];

  constructor(private router: Router, private listService: ListService) {
    router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof RouterEvent))
      .subscribe((e: RouterEvent) => {
        this.currentRoute = e.url;
      });
  }

  ngOnInit() {
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

    if (String(this.currentRoute) == '/admin') {
      this.items.splice(1, 0, {
        label: 'Add',
        icon: 'pi pi-fw pi-calendar-plus',
        command: () => this.listService.addProd(),
      });
    }
  }

  search(textBar: string) {
    if (textBar.length) {
      this.listService.getProducts().subscribe(
        (prod) => {
          console.log(prod);
          this.productsName = [];
          this.resultSearch = [];
          prod.forEach((product) =>
            this.productsName.push(product.name?.toLowerCase())
          );

          for (let i = 0; i < this.productsName.length; i++) {
            if (this.productsName[i].includes(textBar)) {
              this.resultSearch.push(this.productsName[i]);
            }
          }
          console.log(this.resultSearch);
        },
        () => alert('GET SEARCH ERROR')
      );
      console.log(textBar.length);
    } else {
      this.productsName = [];
      this.resultSearch = [];
    }
  }
}

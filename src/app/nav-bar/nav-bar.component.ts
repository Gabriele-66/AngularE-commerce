import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { ListService } from '../services/list.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  items!: MenuItem[];
  resultSearch?: any[] = [];
  productsName: any[] = [];

  constructor(private router: Router, private listService: ListService) {}

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
          {
            label: 'User Page',
            icon: 'pi pi-fw pi-users',
            command: () => this.router.navigate(['user']),
          },
        ],
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.router.navigate(['login']),
      },
    ];
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

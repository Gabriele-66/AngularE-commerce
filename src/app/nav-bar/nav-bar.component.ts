import { Component, OnInit } from '@angular/core';
import { Event, RouterEvent, Router } from '@angular/router';
import { filter } from 'rxjs';

import { MenuItem } from 'primeng/api';

import { ListService } from '../services/list.service';
import { AdminPageComponent } from '../admin-page/admin-page.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  items!: MenuItem[];
  currentRoute!: string;
  resultSearch?: any[] = [];

  constructor(private router: Router, private listService: ListService, private adminPage:AdminPageComponent) {
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
        command: () => (this.adminPage.products = this.listService.addProd()),
      });
    }
  }

  search(textBar: string) {
    this.resultSearch = this.listService.search(textBar);
  }
}

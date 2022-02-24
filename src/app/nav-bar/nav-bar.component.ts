import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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

  items!: MenuItem[];
  products$!: Observable<Product[]>;
  private searchTerms = new Subject<string>();

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

    console.log(this.appComponent.currentRoute);

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

    this.products$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.liService.searchProducts(term))
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

}

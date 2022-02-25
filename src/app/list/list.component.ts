import {Component, OnInit} from '@angular/core';
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
  products: Product[] = [];
  operation: string = 'Edit';
  public currentRoute!: string;

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
    this.listService.getProducts().then((data) => (this.products = data));
    this.primengConfig.ripple = true;
  }

  edit() {
    if (this.operation == 'Edit') {
      this.operation = 'Confirm';
    }
  }
}

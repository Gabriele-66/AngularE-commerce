import {Component, OnInit} from '@angular/core';
import {ListService} from '../services/list.service';
import {Product} from '../model/product';
import {SelectItem} from 'primeng/api';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  sortOptions: SelectItem[] = [];
  sortOrder!: number;
  sortField!: string;

  constructor(
    private listService: ListService,
    private primengConfig: PrimeNGConfig
  ) {
  }

  ngOnInit() {
    this.listService.getProducts().then((data) => (this.products = data));
    this.primengConfig.ripple = true;
  }

}

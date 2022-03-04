import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListService } from '../services/list.service';
import { Product } from '../model/product';

import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  public products: Product[] = [];
  display: boolean = false;

  @ViewChild('scroll')
  scroll!: ElementRef;

  constructor(
    private listService: ListService,
    private confirmationService: ConfirmationService
  ) {
    this.getProducts();
  }

  ngOnInit() {}

  getProducts() {
    this.listService.getProducts().subscribe(
      (prod) => (this.products = prod),
      () => alert('GET ADMIN ERROR')
    );
  }

  edit(prod: Product) {
    this.listService
      .edit(prod)
      ?.then(() => this.getProducts())
      .catch((error) => console.log('error', error));
  }

  delete(prod: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure to remove this product?',
      accept: () => {
        this.listService.delete(prod.id).subscribe(
          () => this.getProducts(),
          () => alert('DELTE ERROR')
        );
      },
    });
    
  }

  displayAdd: boolean = false;
  add() {
    this.displayAdd = true;
    this.listService
      .addProd()
      .then(() => this.getProducts())
      .catch((error) => console.log('error', error));
  }

  btnUp() {
    this.scroll.nativeElement.scrollTop = 0;
  }

  btnDown() {
    this.scroll.nativeElement.scrollTop =
      this.scroll.nativeElement.scrollHeight;
  }
}

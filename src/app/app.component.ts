import { Component, OnInit } from '@angular/core';
import { ListService } from './services/list.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ECommerce';
  constructor( private listService:ListService ) {}
  ngOnInit() {
    this.listService.getProducts();
  }
}

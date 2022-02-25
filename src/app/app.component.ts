import { Component } from '@angular/core';
import { RouterEvent } from '@angular/router';
import { ListService } from './services/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GitAngularECommerce';

  public currentRoute!: string;

  constructor(private listService: ListService) {

    this.currentRoute = String(this.listService.whereAmI());
    console.log(this.listService.whereAmI().subscribe((e: RouterEvent) => this.currentRoute = e.url));
  }

}
/*


      .subscribe((e: RouterEvent) => {
      this.currentRoute = e.url;
      console.log(this.currentRoute)
    });
*/

/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { AppState } from './app.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2'
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [
        require("./app.style.scss").toString()
  ],
  template: `
    <div class="container-fluid">
        <div class="row">
            <nav class="col-sm-4">
              <span>
                <a [routerLink]=" ['./'] ">
                  Index
                </a>
              </span>
              |
              <span>
                <a [routerLink]=" ['./home'] ">
                  Home
                </a>
              </span>
              |
              <span>
                <a [routerLink]=" ['./detail'] ">
                  Detail
                </a>
              </span>
              |
              <span>
                <a [routerLink]=" ['./about'] ">
                  About
                </a>
              </span>
            </nav>

            <main class="col-sm-4">
              <h1>Example heading <span class="label label-primary">New</span></h1>
              <router-outlet></router-outlet>
            </main>
        </div>

        <div class="row">
            <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
        </div>

    </div>
    <h1>Orders List</h1>
    <table>
      <tr *ngFor="let order of orders | async">
        <td>{{order.ShipCity}}</td>
        <td>{{order.ShipCountry}}</td>
        <td>{{order.ShipName}}</td>
      </tr>
    </table>
  `
})
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  orders: FirebaseListObservable<any[]>;
  constructor(public appState: AppState, public firebase: AngularFire) {
    this.orders = firebase.database.list('/Orders', {
      query: {
        limitToFirst: 10,
        orderByKey: true
      }
    })
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */

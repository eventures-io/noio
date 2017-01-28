import { Component } from '@angular/core';
import {NavParams} from "ionic-angular/index";
import {NavController} from "ionic-angular/index";

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  selectedItem: any;

  constructor(private navCtrl: NavController, navParams: NavParams) {
     this.selectedItem = navParams.get('item');
  }

  swipeEvent(event) {
    if (event.direction == 2) {
      //direction 2 = right to left swipe.
      this.navCtrl.pop();
    }
  }

}

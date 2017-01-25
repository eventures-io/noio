import { Component } from '@angular/core';
import {NavParams} from "ionic-angular/index";
import {NavController} from "ionic-angular/index";

//import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  selectedItem: any;

  constructor(private nav: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }



}

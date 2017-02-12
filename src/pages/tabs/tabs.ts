import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { ShoppingListPage } from '../shopping-list/shopping.list';
import {NavController} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root:any = HomePage;
  tab2Root:any = SearchPage;
  tab3Root:any = ShoppingListPage;
  mySelectedIndex:number;

  constructor(navParams:NavParams, private navCtrl:NavController) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }


}

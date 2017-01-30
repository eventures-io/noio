import { Component } from '@angular/core';
import {DetailPage} from '../detail/detail';
import { NavController} from 'ionic-angular';
import { ActionSheetController} from 'ionic-angular';
import {WPService} from "../../app/wp.service";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url:string = 'http://46.101.15.203/wp-json/wp/v2/';
  items:any;
  itemVisual = 'item-visual';

  constructor(private navCtrl:NavController, private wpService: WPService,
              private actionSheetCtrl:ActionSheetController) {

  }

  loadLatestRecipies() {
    this.wpService.loadLatestRecipes()
      .subscribe(data => {
        this.items = data;
      });
  }

  loadRecipesByTag(tag){
    this.wpService.loadRecipesByTag(tag)
      .subscribe(data => {
        this.items = data;
      });
  }

  ionViewDidEnter() {
    this.loadLatestRecipies();
  }

  itemTapped(event, item) {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }

  presentFilterOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Filter the recipe list',
      buttons: [
        {
          text: 'In Season',
          handler: () => {
              //TODO
          }
        },
        {
          text: 'Vegetarian',
          handler: () => {
            this.loadRecipesByTag('vegetarian');
          }
        },
        {
          text: 'Meat',
          handler: () => {
            this.loadRecipesByTag('meat');
          }
        },
        {
          text: 'Seafood',
          handler: () => {
            this.loadRecipesByTag('seafood');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


}

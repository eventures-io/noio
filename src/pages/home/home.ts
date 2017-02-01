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

  items:any;
  itemVisual = 'item-visual';
  loading: boolean = false;

  constructor(private navCtrl:NavController, private wpService:WPService,
              private actionSheetCtrl:ActionSheetController) {

  }

  loadLatestRecipies() {
    this.loading = true;
    this.wpService.loadLatestRecipes()
      .subscribe(data => {
        this.items = data
        this.loading = false;
      });
  }

  loadRecipesByTag(tag) {
    this.loading = true;
    let tagdId = this.wpService.getTagId(tag);
    this.wpService.findRecipes('tags', tagdId)
      .subscribe(data => {
        this.items = data;
        this.loading = false;
      });
  }

  ionViewDidEnter() {
    this.loadLatestRecipies();
  }

  showDetail(item) {
    this.navCtrl.push(DetailPage, {
      item: item
    });
    setTimeout(() => {
      item.showExcerpt = false;
    }, 500);
  }

  toggleShowMore(item) {
    let showExcerpt = item.showExcerpt;
    this.resetShowExcerpt();
    item.showExcerpt = !showExcerpt;
  }

  resetShowExcerpt() {
     this.items.forEach(function(item){
      item.showExcerpt =  false;
    });
  }

  swipeLeftEvent(event, item) {
    this.toggleShowMore(item);
  }

  presentFilterOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Filter the recipe list',
      buttons: [

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
          text: 'Poultry',
          handler: () => {
            this.loadRecipesByTag('poultry');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.loadLatestRecipies();
          }
        }
      ]
    });
    actionSheet.present();
  }


}

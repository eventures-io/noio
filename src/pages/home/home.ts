import { Component } from '@angular/core';
import {DetailPage} from '../detail/detail';
import { NavController} from 'ionic-angular';
import { ActionSheetController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url:string = 'http://46.101.15.203/wp-json/wp/v2/';
  items:any;
  itemVisual = 'item-visual';

  constructor(private navCtrl:NavController, private http:Http,
              public actionSheetCtrl:ActionSheetController) {
  }


  loadRecipies(url) {
    this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        this.items = data;
        this.items.map(function (item) {

          var media = item._embedded['wp:featuredmedia'];
          if (media) {
            item.featuredImage = media[0].source_url;
          }
          return item;
        })
      });

  }

  ionViewDidEnter() {
    this.loadRecipies(this.url.concat('posts?_embed'));
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
            console.log('in season clicked');
          }
        },
        {
          text: 'Vegetarian',
          handler: () => {
            this.loadRecipies(this.url.concat('posts?tags=3&_embed'))
            console.log('Vegetarian clicked');
          }
        },
        {
          text: 'Meat',
          handler: () => {
            console.log('in season clicked');
          }
        },
        {
          text: 'Seafood',
          handler: () => {
            console.log('in season clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


}

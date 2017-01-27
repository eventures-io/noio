import { Component } from '@angular/core';
import {DetailPage} from '../detail/detail';
import { NavController} from 'ionic-angular';
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

  constructor(public navCtrl:NavController, private http:Http, private nav:NavController) {
  }


  ionViewDidEnter() {



    this.http.get(this.url.concat('posts?_embed'))
      .map(res => res.json())
      .subscribe(data => {
        this.items = data;
        this.items.map(function(item){

          var media = item._embedded['wp:featuredmedia'];
          if(media) {
            item.featuredImage = media[0].source_url;
          }
          return item;
        } )
      });
  }

  itemTapped(event, item) {
    this.nav.push(DetailPage, {
      item: item
    });
  }

}

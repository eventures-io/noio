import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class WPService {

  private baseUrl:string = 'http://46.101.15.203/wp-json/wp/v2/';

  constructor(private http: Http) {

  }

  loadLatestRecipes():Observable<any> {
    //TODO add date params
    let that = this;
    return Observable.create(observer => {
      this.http.get(this.baseUrl.concat('posts?_embed'))
        .map(res => res.json())
        .subscribe((data) => {
        let result = that.mapResultData(data);
        observer.next(result);
        observer.complete();
      });
    });
  }

  loadRecipesByTag(tag) {
    let tagId:number;
    switch (tag) {
      case "vegetarian":
        tagId = 3;
        break;
      case "meat":
        tagId = 4;
        break;
      case "seafood":
        tagId = 5;
        break;
      case "poultry":
        tagId = 6;
        break;
      default:
        console.error(`no case for ${tag}`);
    }

    if(tagId) {
      var that = this;
      return Observable.create(observer => {
        this.http.get(this.baseUrl.concat(`posts?tags=${tagId}&_embed`))
          .map(res => res.json())
          .subscribe((data) => {
            let result = that.mapResultData(data);
            observer.next(result);
            observer.complete();
          });
      });
    }
  }

  loadRecipesByCategory(category) {
    var that = this;
    return Observable.create(observer => {
      this.http.get(this.baseUrl.concat(`posts?category=${category}&_embed`))
        .map(res => res.json())
        .subscribe((data) => {
          let result = that.mapResultData(data);
          observer.next(result);
          observer.complete();
        });
    });
  }

  private mapResultData(data){
    return data.map(function (item) {
      var media = item._embedded['wp:featuredmedia'];
      if (media) {
        item.featuredImage = media[0].source_url;
      }
      return item;
    })
  }


}

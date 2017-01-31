import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

export type QueryType = 'tags' | 'categories'

@Injectable()
export class WPService {

  private baseUrl:string = 'http://46.101.15.203/wp-json/wp/v2/';

  constructor(private http:Http) {

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

  getTagId(tag) {
    let tagId:number;
    switch (tag) {
      case "vegetarian":
        tagId = 3;
        break;
      case "meat":
        tagId = 10;
        break;
      case "seafood":
        tagId = 8;
        break;
      case "poultry":
        tagId = 9;
        break;
      default:
        console.error(`no case for ${tag}`);
    }
    return tagId;
  }

  getCategoryId(category) {
    let catId:number;
    switch (category) {
      case "main":
        catId = 2;
        break;
      case "salad":
        catId = 4;
        break;
      case "soup":
        catId = 5;
        break;
      case "starter":
        catId = 6;
        break;
      case "desert":
        catId = 7;
        break;
      default:
        console.error(`no case for ${category}`);
    }
    return catId;
  }


  //TODO queryValue: Array
  findRecipes(queryType:QueryType, queryValue:any) {
    let url = (this.baseUrl.concat(`posts?${queryType}=${queryValue}&_embed`));
    let that = this;
    return Observable.create(observer => {
      this.http.get(url)
        .map(res => res.json())
        .subscribe((data) => {
          let result = that.mapResultData(data);
          observer.next(result);
          observer.complete();
        });
    });
  }


  private mapResultData(data) {
    return data.map(function (item) {
      var media = item._embedded['wp:featuredmedia'];
      if (media) {
        item.featuredImage = media[0].source_url;
      }
      return item;
    })
  }


}

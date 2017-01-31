import { Component } from '@angular/core';
import {DetailPage} from '../detail/detail';
import { NavController} from 'ionic-angular';
import {WPService} from '../../app/wp.service'


export class CourseFilter {
  starter:boolean = false;
  main:boolean = false;
  dessert:boolean = false;

}

export class IngredientsFilter {
  vegetarian:boolean = false;
  meat:boolean = false;
  seafood:boolean = false;
  poultry:boolean = false;
}


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  items:any = [];
  itemVisual = 'item-visual';
  courseFilter : CourseFilter = new CourseFilter();
  ingredientsFilter : IngredientsFilter = new IngredientsFilter();
  selectedCourses = [];
  selectedIngredients = [];
  searchText = "";
  submitted: boolean = false;
  loading: boolean = false;

  constructor(private navCtrl:NavController, private wpService: WPService) {

  }

  findRecipesByCategory(category) {
    this.loading = true;
    let catId = this.wpService.getCategoryId(category);
    this.wpService.findRecipes('categories', catId)
      .subscribe(data => {
        this.items = this.items.concat(data);
        this.loading = false;
      });

  }

  findRecipesByTags(tag) {
    this.loading = true;
    let tagId = this.wpService.getTagId(tag);
    this.wpService.findRecipes('tags', tagId)
      .subscribe(data => {
        this.items = this.items.concat(data);
        this.loading = false;
      });

  }


  itemTapped(event, item) {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }

  submitSearch() {

    this.selectedIngredients = [];
    this.selectedCourses = [];
    this.items =  [];

    for (var filter in this.courseFilter) {
      if(this.courseFilter[filter]){
        this.selectedCourses.push(filter);
        this.findRecipesByCategory(filter);
      }
    }

    for (var filter in this.ingredientsFilter) {
      if(this.ingredientsFilter[filter]){
        this.selectedIngredients.push(filter);
        this.findRecipesByTags(filter);
      }
    }

    this.submitted =  true;

  }

  resetSearch() {
    for (var filter in this.courseFilter) {
         this.courseFilter[filter] = false;
    }
    for (var filter in this.ingredientsFilter) {
      this.ingredientsFilter[filter] = false;
    }

    this.searchText = "";
    this.selectedIngredients = [];
    this.selectedCourses = [];

    this.items = [];
  }

  resetSubmit() {
    this.submitted = false;
  }




}

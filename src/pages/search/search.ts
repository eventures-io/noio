import { Component } from '@angular/core';
import {DetailPage} from '../detail/detail';
import { NavController} from 'ionic-angular';
import {WPService} from '../../app/wp.service'


export class CourseFilter {
  starters:boolean = false;
  mains:boolean = false;
  desserts:boolean = false;

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

  constructor(private navCtrl:NavController, private wpService: WPService) {

  }

  loadRecipesByCategory(category) {
    this.wpService.loadRecipesByCategory(category)
      .subscribe(data => {
        this.items = this.items.concat(data);
      });

  }


  ionViewDidEnter() {

  }

  itemTapped(event, item) {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }

  submitSearch() {
    console.log(JSON.stringify(this.courseFilter));
    console.log(JSON.stringify(this.ingredientsFilter));
    console.log(JSON.stringify(this.searchText));

    this.selectedIngredients = [];
    this.selectedCourses = [];

    for (var filter in this.courseFilter) {
      if(this.courseFilter[filter]){
        this.selectedCourses.push(filter);
        this.loadRecipesByCategory(filter);
      }
    }

    for (var filter in this.ingredientsFilter) {
      if(this.ingredientsFilter[filter]){
        this.selectedIngredients.push(filter);

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

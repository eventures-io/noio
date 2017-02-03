import { Component, ElementRef } from '@angular/core';
import {NavParams} from "ionic-angular/index";
import {NavController} from "ionic-angular/index";
import {ShoppingListPage} from "../shopping-list/shopping.list";

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  selectedItem: any;

  constructor(private navCtrl: NavController, navParams: NavParams, private elementRef: ElementRef) {
     this.selectedItem = navParams.get('item');
  }


  exportIngredientsToShoppingList() {
    //Cannot use @ViewChild, #attribute gets sanitized
    let ingredientElements = this.elementRef.nativeElement.querySelector('.ingredients');
    let tagList = ingredientElements.getElementsByTagName('li');
    let ingredientsList = [];
    for (let el of tagList){
      ingredientsList.push({text: el.innerHTML});
    }
    let shoppingList = {
      recipeTitle : this.selectedItem.title.rendered,
      ingredientsList : ingredientsList
    }

    this.navCtrl.push(ShoppingListPage, {
      shoppingList: shoppingList
    });
  }


  navigateBack() {
      this.navCtrl.pop();
  }

}

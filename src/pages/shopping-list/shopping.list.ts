import { Component } from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {ShoppingListService} from "../../app/shopping-list-service";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

  shoppingLists = [];

  constructor(private navCtrl:NavController, navParams:NavParams, private shoppingListService: ShoppingListService) {

    this.shoppingLists = this.shoppingListService.shoppingList;
  }


  deleteRecipe(index) {
    this.shoppingLists = this.shoppingListService.removeRecipe(index);
  }

  deleteIngredient(recipeIndex, ingredientIndex){
    this.shoppingLists = this.shoppingListService.deleteIngredient(recipeIndex, ingredientIndex);
  }
}

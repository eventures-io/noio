import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DetailPage } from '../pages/detail/detail';
import { SearchPage } from '../pages/search/search';
import { ShoppingListPage } from '../pages/shopping-list/shopping.list';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {WPService} from "./wp.service";
import {ShoppingListService} from "./shopping-list-service";

@NgModule({
  declarations: [
    MyApp,
    DetailPage,
    SearchPage,
    ShoppingListPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetailPage,
    SearchPage,
    ShoppingListPage,
    HomePage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, WPService, ShoppingListService]
})
export class AppModule {}

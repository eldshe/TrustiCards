import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { DescriptionsComponent } from './descriptions/descriptions.component';
import { PopupComponent } from './popup/popup.component';
import {CurrencyPipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    DescriptionsComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

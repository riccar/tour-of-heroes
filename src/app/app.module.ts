import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],

  /**
   * HeroService must be provided in the dependency injection system before Angular can inject it 
   * into the HeroesComponent
   * 
   * The providers array tells Angular to create a single, shared instance of HeroService and inject 
   * into any class that asks for it.
   */
  providers: [HeroService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

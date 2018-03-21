/**
 * Components shouldn't fetch or save data directly and they certainly 
 * shouldn't knowingly present fake data. They should focus on presenting 
 * data and delegate data access to a service.
 * 
 * Services are a great way to share information among classes that don't 
 * know each other.
 * 
 * The HeroService could get hero data from anywhere—a web service, local storage, 
 * or a mock data source. Removing data access from components means you can change 
 * your mind about the implementation anytime, without touching any components. 
 * They don't know how the service works.
 */

import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

//Simulate getting data from the server with the RxJS of() function.
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';

/**
 * The @Injectable() decorator tells Angular that this service might itself 
 * have injected dependencies. It doesn't have dependencies now but it will soon. 
 * Whether it does or it doesn't, it's good practice to keep the decorator.
 */
@Injectable()
export class HeroService {

  /**
   * Modify the constructor with a parameter that declares a private messageService property. 
   * Angular will inject the singleton MessageService into that property when it creates the HeroService.
   * This is a typical "service-in-service" scenario: you inject the MessageService 
   * into the HeroService which is injected into the HeroesComponent.
   */
  constructor(private messageService: MessageService) { }
  
  getHeroes(): Observable<Hero[]> {

    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');

    //of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
    return of(HEROES);
  }

  /*getHeroes(): Hero[] {
    return HEROES;
  }*/

}

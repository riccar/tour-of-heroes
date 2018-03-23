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
//Simulate getting data from the server with the RxJS of() function.
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * The @Injectable() decorator tells Angular that this service might itself 
 * have injected dependencies. It doesn't have dependencies now but it will soon. 
 * Whether it does or it doesn't, it's good practice to keep the decorator.
 */
@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  /**
   * Modify the constructor with a parameter that declares a private messageService property. 
   * Angular will inject the singleton MessageService into that property when it creates the HeroService.
   * This is a typical "service-in-service" scenario: you inject the MessageService 
   * into the HeroService which is injected into the HeroesComponent.
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  
/**
 * GET heroes from the server
 * 
 * The catchError() operator intercepts an Observable that failed. 
 * It passes the error an error handler that can do what it wants with the error.
 * 
 * The HeroService methods will tap into the flow of observable values and send 
 * a message (via log()) to the message area at the bottom of the page.
 * 
 * They'll do that with the RxJS tap operator, which looks at the observable values, 
 * does something with those values, and passes them along. The tap call back doesn't touch the values themselves.
 */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }

 

  /*getHeroes(): Observable<Hero[]> {

    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');

    //of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
    return of(HEROES);
  }*/

  /** 
   * GET hero by id. Will 404 if id not found 
   * 
   * here are three significant differences from getHeroes().

    -it constructs a request URL with the desired hero's id.
    -the server should respond with a single hero rather than an array of heroes.
    -therefore, getHero returns an Observable<Hero> ("an observable of Hero objects") 
    rather than an observable of hero arrays .

   * */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /*getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetching hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }*/

  /** 
   * PUT: update the hero on the server 
   * 
   * The HttpClient.put() method takes three parameters

    the URL
    the data to update (the modified hero in this case)
    options
    
    The URL is unchanged. The heroes web API knows which hero to update by looking at the hero's id.
   * */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server 
   * 
   * HeroService.addHero() differs from updateHero in two ways.

    it calls HttpClient.post() instead of put().
    it expects the server to generates an id for the new hero, which it returns in the Observable<Hero> to the caller.

  */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero with id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server 
   * 
   * it calls HttpClient.delete.
   * the URL is the heroes resource URL plus the id of the hero to delete
   * you don't send data as you did with put and post.
   * you still send the httpOptions.

  */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** GET heroes whose name contains search term
   * The method returns immediately with an empty array if there is no search term. 
   * The rest of it closely resembles getHeroes(). The only significant difference is the URL, 
   * which includes a query string with the search term.
  
  */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

   /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /*getHeroes(): Hero[] {
    return HEROES;
  }*/

}

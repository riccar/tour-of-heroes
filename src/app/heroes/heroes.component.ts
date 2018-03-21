import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  selectedHero: Hero;

  /*
  Reserve the constructor for simple initialization such as wiring constructor parameters to properties. 
  The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests 
  to a remote server as a real data service would.
  */
  
  /*Add a private heroService parameter of type HeroService to the constructor.
  The parameter simultaneously defines a private heroService property and identifies it as a HeroService 
  injection site. When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService 
  parameter to the singleton instance of HeroService. 
  */
  constructor(private heroService: HeroService) { }

  /* 
  call getHeroes() inside the ngOnInit lifecycle hook and let Angular call ngOnInit 
  at an appropriate time after constructing a HeroesComponent instance.
  */
  ngOnInit() {
    this.getHeroes();
  }
  
  //Create a function to retrieve the heroes from the service.
  getHeroes(): void {
    /**
     * The HeroService.getHeroes() method has a synchronous signature, 
     * which implies that the HeroService can fetch heroes synchronously. 
     * The HeroesComponent consumes the getHeroes() result as if heroes could be fetched synchronously.
     * 
     * This will not work in a real app. Soon the app will fetch heroes from a remote server, which is an 
     * inherently asynchronous operation. The HeroService must wait for the server to respond, 
     * getHeroes() cannot return immediately with hero data, and the browser will not block while the service waits.
     */

    //this.heroes = this.heroService.getHeroes();

    /**
     * The new version waits for the Observable to emit the array of heroes— which could happen 
     * now or several minutes from now. Then subscribe passes the emitted array to the callback, 
     * which sets the component's heroes property.
     */
    
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}

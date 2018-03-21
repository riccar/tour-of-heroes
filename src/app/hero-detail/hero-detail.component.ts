import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  //This component receives a hero property and displays it.
  //hence it must be decorated with the @Input() decorator
  @Input() hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}

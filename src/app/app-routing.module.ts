/**
 * This app-routing module was generated with the following cli command
 * ng generate module app-routing --flat --module=app
 * --flat puts the file in src/app instead of its own folder.
 * --module=app tells the CLI to register it in the imports array of the AppModule.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent }   from './hero-detail/hero-detail.component';
import { DashboardComponent }   from './dashboard/dashboard.component';


const routes: Routes = [
  //This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'.
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
];
/**
 * Add an @NgModule.exports array with RouterModule in it. 
 * Exporting RouterModule makes router directives available for use 
 * in the AppModule components that will need them.
 * 
 * Add RouterModule to the @NgModule.imports array and configure it 
 * with the routes in one step by calling RouterModule.forRoot() within the imports array
 * 
 * The method is called forRoot() because you configure the router at the application's root level. 
 * The forRoot() method supplies the service providers and directives needed for routing, and performs 
 * the initial navigation based on the current browser URL.
 */
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

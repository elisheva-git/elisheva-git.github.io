import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/main/home/home.component';
import { FavoritesComponent } from './modules/main/favorites/favorites.component';
import { BasicNavComponent } from './modules/main/basic-nav/basic-nav.component';
import { PageNotFoundComponent } from './modules/other/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:"",component:BasicNavComponent,
  children:[
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",component:HomeComponent},
    {path:"home/:key/:name",component:HomeComponent},
    {path:"favorites",component:FavoritesComponent},
    {path:"**",component:PageNotFoundComponent}
  ]},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

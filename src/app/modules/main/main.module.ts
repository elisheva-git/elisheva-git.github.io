import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/material.module';
import { MainService } from './main.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BasicNavComponent } from './basic-nav/basic-nav.component';
import { PageNotFoundComponent } from '../other/page-not-found/page-not-found.component';
import { FavoritesService } from './favorites.service';



@NgModule({
  declarations: [BasicNavComponent,FavoritesComponent,HomeComponent],
  imports: [
    CommonModule,MaterialModule,HttpClientModule,RouterModule,ReactiveFormsModule,FormsModule
  ],
  providers:[
    MainService,FavoritesService
  ]
})
export class MainModule { }

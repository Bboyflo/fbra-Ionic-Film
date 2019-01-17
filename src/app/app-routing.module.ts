import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'films', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'series', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'favoris', loadChildren: './favoris/favoris.module#FavorisPageModule' },
  { path: 'details/:id', loadChildren: './details/details.module#DetailsPageModule' }
]

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }

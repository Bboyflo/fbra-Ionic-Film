import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'films',
        loadChildren: '../films/films.module#FilmsPageModule'
      },
      {
        path: 'series',
        loadChildren: '../series/series.module#SeriesPageModule'
      },
      {
        path: 'favoris',
        loadChildren: '../favoris/favoris.module#FavorisPageModule'
      },
      {
        path: '',
        redirectTo: '/tabs/films',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/films',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

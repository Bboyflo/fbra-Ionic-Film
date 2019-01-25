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
        children: [
          {
            path: '',
            loadChildren: '../films/films.module#FilmsPageModule'
          }
        ]
      },
      {
        path: 'series',
        children: [
          {
            path: '',
            loadChildren: '../series/series.module#SeriesPageModule'
          }
        ]
      },
      {
        path: 'favoris',
        children: [
          {
            path: '',
            loadChildren: '../favoris/favoris.module#FavorisPageModule'
          }
        ]
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

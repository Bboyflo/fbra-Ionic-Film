import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { FilmServiceService } from '../film-service.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})

export class FilmsPage implements OnInit {

  
  infoMovies: any;

  constructor(public api: FilmServiceService, public loadingController: LoadingController) { }

  async getInfoMovies() {
    await this.api.getInfoMoviesByTitle("Percy")
      .subscribe(res => {
        console.log(res);
        this.infoMovies = res;
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.getInfoMovies()
  }

}

import { Component, OnInit } from '@angular/core';
import { DbFavorisService } from '../Services/db-favoris.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

  favoriteMovies= [];

  constructor(private DbFavorisService: DbFavorisService, public navCtrl: NavController) {}
 
  ionViewDidLoad() {
    console.log("ionViewDidLoad MyMoviesPage");
  }
 
  ionViewWillEnter() {
    //console.log('ionViewWillEnter');
    this.favoriteMovies = [];
    this.initFavoriteMovies();
  }
 
  private initFavoriteMovies() {
    this.DbFavorisService
      .getFavoriteMovies()
      .then(favs => (this.favoriteMovies = favs));
  }
 
  findMovie() {
    //this.navCtrl.push(MovieListPage);
  }
 
  goToDetail(movie: any) {
    console.log(movie)
    if (movie.Type == "episode"){
      this.navCtrl.navigate("details/" + movie.seriesID + "/season/" + movie.Season + "/episode/" + movie.Episode, {});
    } else {
      this.navCtrl.navigate("details/" + movie.imdbID, {});
    }
  }

  doRefresh(event) {

    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 2000);
  }

  ngOnInit() {
  }

}

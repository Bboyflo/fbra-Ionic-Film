import { Component, OnInit } from '@angular/core';
import { DbFavorisService } from '../Services/db-favoris.service';
import { NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

  favoriteMovies= [];

  constructor(private DbFavorisService: DbFavorisService, public navCtrl: NavController, private file: File) {}
 
  ionViewDidLoad() {
    console.log("ionViewDidLoad MyMoviesPage");
  }
 
  ionViewWillEnter() {
    //console.log('ionViewWillEnter');
    this.favoriteMovies = [];
    this.initFavoriteMovies();
    this.file.writeFile(this.file.externalRootDirectory + '/Download/', 'JsonFavorites', JSON.stringify(this.favoriteMovies), {replace:true});

    this.presentAlert();
  }

  async presentAlert() {
    const alertController = document.querySelector('ion-alert-controller');
    await alertController.componentOnReady();
  
    const alert = await alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'URL : ' + this.file.externalRootDirectory + '/Download/' + ' / JSON : ' + JSON.stringify(this.favoriteMovies),
      buttons: ['OK']
    });
    return await alert.present();
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

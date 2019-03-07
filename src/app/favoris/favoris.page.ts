import { Component, OnInit } from '@angular/core';
import { DbFavorisService } from '../Services/db-favoris.service';
import { NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

  favoriteMovies= [];

  constructor(private DbFavorisService: DbFavorisService, public navCtrl: NavController, private file: File,
     private fileChooser: FileChooser) {}
 
  ionViewDidLoad() {
    console.log("ionViewDidLoad MyMoviesPage");
  }
 
  ionViewWillEnter() {
    //console.log('ionViewWillEnter');
    this.favoriteMovies = [];
    this.initFavoriteMovies();
  }


  exportJSON(){
    if (this.favoriteMovies != null){
      this.file.writeFile(this.file.externalRootDirectory + '/Downloads/', 'JsonFavorites.json', JSON.stringify(this.favoriteMovies), {replace:true});
      alert("l'export a fonctionné");
    } else {
      alert("Vous n'avez pas de favoris à exporter");
    }
  }

  importJSON(){
    this.fileChooser.open()
    .then(uri => uri)
    .catch(e => console.log(e));
  }

  exportCSV(){
    if (this.favoriteMovies != null){
      this.file.writeFile(this.file.externalRootDirectory + '/Downloads/', 'JsonFavorites.csv', this.favoriteMovies, {replace:true});
      alert("l'export a fonctionné");
    } else {
      alert("Vous n'avez pas de favoris à exporter");
    }
  }

  importCSV(){
    this.fileChooser.open()
    .then(uri => uri)
    .catch(e => console.log(e));
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

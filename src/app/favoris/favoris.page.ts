import { Component, OnInit } from '@angular/core';
import { DbFavorisService } from '../Services/db-favoris.service';
import { NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Platform } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

  favoriteMovies = [];
  filePath: string = "";
  fileName: string = "";

  constructor(private DbFavorisService: DbFavorisService, public navCtrl: NavController, private file: File,
     private fileChooser: FileChooser, public platform: Platform, private actionSheetController:ActionSheetController) {}
 
  ionViewWillEnter() {
    //console.log('ionViewWillEnter');
    this.favoriteMovies = [];
    this.initFavoriteMovies();
  }

  async exportJSON(){
    if(this.platform.is('android')) {
      
        const actionSheet = await this.actionSheetController.create({
        header: "type de l'export",
        buttons: [{
          text: 'JSON',
          handler: () => {
            if (this.favoriteMovies.length != 0){
              this.file.writeFile(this.file.externalRootDirectory + '/Downloads/', 'JsonFavorites.json', JSON.stringify(this.favoriteMovies), {replace:true});
              alert("l'export a fonctionné, le chemin du fichier est : " + this.file.externalRootDirectory + '/Downloads/');
            } else {
              alert("Vous n'avez pas de favoris à exporter");
            }
          }
        }, {
          text: 'CSV',
          handler: () => {
            console.log('Share clicked');
          }
        }]
      });
      await actionSheet.present();
    }
  } 

  importJSON(){
    if(this.platform.is('android')) {
      this.fileChooser.open().then(uri => {
        this.file.resolveLocalFilesystemUrl(this.filePath).then(data => {
          this.fileName = data.name
          this.file.readAsText(this.filePath, this.fileName).then(favoris => {
              this.favoriteMovies = JSON.parse(favoris)
          })
        })
      })
    }
    alert(this.filePath + " ///// " + this.fileName);
    alert(this.favoriteMovies);
  }

  exportCSV(){

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
    //console.log(movie)
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

import { MoviesIdModel } from './../model/MediaIdModel';
import { FavoriteMovieModel } from './../model/FavoriteMovieModel';
import { Component, OnInit } from '@angular/core';
import { DbFavorisService } from '../Services/db-favoris.service';
import { NavController, AlertController } from '@ionic/angular';
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

  favoriteMovies: Array<MoviesIdModel> = [];
  filePath: string = "";
  favoriteMoviesCSVTab : Array<FavoriteMovieModel> = [];

  constructor(private dbFavorisService: DbFavorisService, public navCtrl: NavController, private file: File,
     private fileChooser: FileChooser, public platform: Platform, private actionSheetController:ActionSheetController, private alertController : AlertController) {}
 
  ionViewWillEnter() {
    //console.log('ionViewWillEnter');
    this.favoriteMovies = [];
    this.initFavoriteMovies();
  }

  private initFavoriteMovies() {
    this.dbFavorisService
      .getFavoriteMovies()
      .then(favs => (this.favoriteMovies = favs));
  }

  async exportFavorites(){
    if(this.platform.is('android')) {
      
        const actionSheet = await this.actionSheetController.create({
        header: "Export type",
        buttons: [{
          text: 'JSON',
          icon: 'download',
          handler: () => {
            this.exportJSON()
          }
        }, {
          text: 'CSV',
          icon: 'download',
          handler: () => {
            this.exportCSV()
          }
        }, {
          text: 'CANCEL',
          handler: () => {
            console.log('Cancel');
          }
        }]
      });
      await actionSheet.present();
    } else {
      alert("The platform used is not android");
    }
  } 

  async importFavorites(){
    if(this.platform.is('android')) {
      
        const actionSheet = await this.actionSheetController.create({
        header: "Import type",
        buttons: [{
          text: 'JSON',
          icon: 'folder',
          handler: () => {
            this.importJSON()
          }
        }, {
          text: 'CSV',
          icon: 'folder',
          handler: () => {
            this.importCSV()
          }
        }, {
          text: 'CANCEL',
          handler: () => {
            console.log('Cancel');
          }
        }]
      });
      await actionSheet.present();
    } else {
      alert("The platform used is not android");
    }
  } 

  exportJSON(){
    if (this.favoriteMovies.length != 0){
      this.file.writeFile(this.file.externalDataDirectory, 'favorites.json', JSON.stringify(this.favoriteMovies), {replace:true});
      alert("The export worked, the file path is : " + this.file.externalDataDirectory);
    } else {
      alert("You do not have favorites to export");
    }
  }

  exportCSV(){
    if (this.favoriteMovies.length != 0){
      for(let i = 0 ; i < this.favoriteMovies.length ; i++){
        let favoriteMoviesCSV = new FavoriteMovieModel(this.favoriteMovies[i].Title, this.favoriteMovies[i].Released, this.favoriteMovies[i].imdbVotes);
        this.favoriteMoviesCSVTab.push(favoriteMoviesCSV);
      }
      this.file.writeFile(this.file.externalRootDirectory + '/Download/', 'CSVFavorites.csv', this.convertObjectToCSV(this.favoriteMoviesCSVTab), { replace: true });
      alert("The export worked, the file path is : " + this.file.externalRootDirectory + '/Download/');
    } else {
      alert("You do not have favorites to export");
    }
  }

  importJSON(){
    this.fileChooser.open()
    .then(uri => {
      this.file.resolveLocalFilesystemUrl(uri.toString())
        .then(fileName => {
          this.filePath = uri.toString().replace(fileName.name.toString(), "")
          this.file.readAsText(this.filePath, fileName.name)
            .then(data => {
              this.favoriteMovies = JSON.parse(data)
              for (let i = 0; i < this.favoriteMovies.length; i++) {
                this.dbFavorisService.addFavoriteMovie(this.favoriteMovies[i]);
              }
            })
            .catch((error) => { console.log('Error when reading Json file', error) });
        }).catch((error) => { console.log('Error when get the path of the file selected', error) });
    }).catch((error) => { console.log('Error when open file chooser', error) });
  }

  /*async presentAlert(headerAlert: string, subHeaderAlert: string, messageAlert: string) {

    const alert = await this.alertController.create({
      header: headerAlert,
      subHeader: subHeaderAlert,
      message: messageAlert,
      buttons: ['OK']
    });
    return await alert.present();
  }*/

  importCSV(){
    this.fileChooser.open()
      .then(uri => {
        this.file.resolveLocalFilesystemUrl(uri.toString())
          .then(fileName => {
            this.filePath = uri.toString().replace(fileName.name.toString(), "");
            this.file.readAsText(this.filePath, fileName.name)
              .then(data => {
                this.favoriteMovies = JSON.parse(this.CSVToJsonConvertor(data))
                for (let i = 0; i < this.favoriteMovies.length; i++) {
                  this.dbFavorisService.addFavoriteMovie(this.favoriteMovies[i]);
                }
              })
              .catch((error) => { console.log('Error when reading CSV file', error) });
          }).catch((error) => { console.log('Error when get the path of the file selected', error) });
      }).catch((error) => { console.log('Error when open file chooser', error) 
    });
  }
 
  convertObjectToCSV(objArray) {    
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = ""; 
    for (let index in objArray[0]) {
        row += index + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line != '') line += ',';
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
  }

  CSVToJsonConvertor(csvFile: string) {
    let array = this.CSVToArray(csvFile, ",");
    let objArray = [];
    for (let i = 1; i < array.length - 1; i++) {
        objArray[i - 1] = {};
        for (let k = 0; k < array[0].length && k < array[i].length; k++) {
            let key = array[0][k];
            objArray[i - 1][key] = array[i][k];
        }
    }
    let json: string = JSON.stringify(objArray);
    let str: string = json.replace(/},/g, "},\r\n");
    return str;
  }

  CSVToArray(strData: string, strDelimiter: string) {
    strDelimiter = (strDelimiter || ",");
    let objPattern: RegExp = new RegExp((
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    let arrData = [[]];
    let arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
      let strMatchedDelimiter = arrMatches[1];
      if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
          arrData.push([]);
      }
      if (arrMatches[2]) {
          var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
      } else {
          var strMatchedValue = arrMatches[3];
      }
      arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
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

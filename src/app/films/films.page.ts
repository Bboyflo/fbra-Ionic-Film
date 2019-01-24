import { Component, OnInit } from '@angular/core';

import { ApiOMDbService } from '../api-omdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})

export class FilmsPage implements OnInit {

  
  infoMovies: any;
  searchTitle: string;
  findMovies: boolean;
  allInfoMovies = [];
  nbPage: number = 1;
  type: string = "movie";
  lastSearchTitle: String = "";
  displaySearchBar: boolean = false;

  constructor(public api: ApiOMDbService, public navCtrl: NavController) {
   }

  async getInfoMovies() {
    await this.api.getInfoByTitle(this.searchTitle.trim(),this.type, this.nbPage)
      .subscribe(res => {
        console.log(res);

        if (this.searchTitle.trim() == ""){
          this.findMovies = false;
        } else {
          this.findMovies = true;
        }
        this.infoMovies = res;

        if (this.lastSearchTitle != this.searchTitle){
          this.allInfoMovies = [];
        }
        if(res.Response == "False")
        {
          this.findMovies = true;
          this.allInfoMovies = [];
        }
        else
        {
          this.findMovies = false;
        for(let i=0; i<this.infoMovies.Search.length; i++)
          {
            this.allInfoMovies.push(this.infoMovies.Search[i]);
          }
        }
        this.lastSearchTitle = this.searchTitle
      }, err => {
        console.log(err);
      });
  }

  doInfinite(infiniteScroll){
    //console.log('Begin async operation');

    setTimeout(async() => {
      this.nbPage++;
      this.getInfoMovies();

      //console.log('Async operation has ended');
      infiniteScroll.target.complete();
    }, 500);
  }

  envoisDetail(id: string){
    this.navCtrl.navigate("details/" + id, {})
  }

  hideSearchBar(){
    this.displaySearchBar = !this.displaySearchBar;
  }

  ngOnInit() {
  }

}
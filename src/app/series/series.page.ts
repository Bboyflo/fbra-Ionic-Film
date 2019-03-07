import { Component, OnInit } from '@angular/core';

import { ApiOMDbService } from '../Services/api-omdb.service';
import { NavController } from '@ionic/angular';
import { seriesModel } from '../model/seriesModel';
import { searchModel } from '../model/searchModel';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {

  infoSeries: searchModel;
  searchTitle: string;
  findSeries: boolean;
  allInfoSeries: Array<seriesModel>;
  nbPage: number = 1;
  type: string = "series";
  lastSearchTitle: string ="";
  displaySearchBar: boolean = false;

  constructor(public api: ApiOMDbService,  public navCtrl: NavController) {
   }

  async getInfoSeries() {
    await this.api.getInfoByTitle(this.searchTitle.trim(),this.type, this.nbPage)
      .subscribe(res => {
        //console.log(res);

        if (this.searchTitle.trim() == ""){
          this.findSeries = false;
        } else {
          this.findSeries = true;
        }
        this.infoSeries = res;

        if (this.lastSearchTitle != this.searchTitle){
          this.allInfoSeries = [];
        }

        if(res.Response == "False")
        {
          this.findSeries = false;
          this.allInfoSeries = [];
        }
        else
        {
          this.findSeries = true;
          for(let i=0; i< this.infoSeries.Search.length ; i++)
          {
            //@ts-ignore
            this.allInfoSeries.push(this.infoSeries.Search[i]);
          }
        }
        
        this.lastSearchTitle = this.searchTitle;

      }, err => {
        console.log(err);
      });
  }

  doInfinite(infiniteScroll){
    //console.log('Begin async operation');

    setTimeout(async() => {
      if (this.allInfoSeries.length < parseInt(this.infoSeries.totalResults)){
        this.nbPage++;
        this.getInfoSeries();
      }

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
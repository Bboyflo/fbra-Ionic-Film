import { Component, OnInit } from '@angular/core';

import { ApiOMDbService } from '../api-omdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {

  infoSeries: any;
  searchTitle: string;
  findSeries: boolean;
  allInfoSeries = [];
  nbPage: number = 1;
  type: string = "series";
  lastSearchTitle: string ="";

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
          this.findSeries = true;
          this.allInfoSeries = [];
        }
        else
        {
          this.findSeries = false;
          for(let i=0; i<this.infoSeries.Search.length; i++)
          {
            this.allInfoSeries.push(this.infoSeries.Search[i]);
          }
        }
        

      }, err => {
        console.log(err);
      });
  }

  doInfinite(infiniteScroll){
    //console.log('Begin async operation');

    setTimeout(async() => {
      this.nbPage++;
      this.getInfoSeries();

      //console.log('Async operation has ended');
      infiniteScroll.target.complete();
    }, 500);
  }

  envoisDetail(id: string){
    this.navCtrl.navigate("details/" + id, {})
  }
  
  ngOnInit() {
  }

}
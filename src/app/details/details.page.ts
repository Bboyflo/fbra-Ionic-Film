import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiOMDbService } from '../Services/api-omdb.service';
import { DbFavorisService } from '../Services/db-favoris.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string;
  details: any;
  nbSeason = [];
  season: string;
  isFavorite: boolean;

  constructor(public api: ApiOMDbService, private route: ActivatedRoute, public navCtrl: NavController, private DbFavorisService: DbFavorisService,) {}

   async getInfos() {
    await this.api.getDetails(this.id)
      .subscribe(res => {
        //console.log(res);

        this.details = res;

        for(let i = 1; i <= parseInt(this.details.totalSeasons) ; i++){
          this.nbSeason.push(i);
        }

      }, err => {
        console.log(err);
      });
  }

  envoisDetailSeason(Season : string){
    this.navCtrl.navigate("details/"+ this.id + "/season/" + Season, {})
  }

  toggleFavorite(){
    this.isFavorite = !this.isFavorite;
    this.DbFavorisService.toogleFavoriteMovie(this.details);
  }

  ionViewDidEnter() {
   this.DbFavorisService.isFavortieMovie(this.details)
      .then(value => (this.isFavorite = value));
    }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getInfos();
  }

  backPage(){
    this.navCtrl.goBack();
  }

  downloadImage(image: string) {
  }
}

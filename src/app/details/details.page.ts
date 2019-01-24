import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiOMDbService } from '../api-omdb.service';
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

  constructor(public api: ApiOMDbService, private route: ActivatedRoute, public navCtrl: NavController) {}

   async getInfos() {
    await this.api.getDetails(this.id)
      .subscribe(res => {
        console.log(res);

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

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getInfos();
  }

}

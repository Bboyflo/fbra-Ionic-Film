import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiOMDbService } from '../api-omdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-saisons',
  templateUrl: './saisons.page.html',
  styleUrls: ['./saisons.page.scss'],
})
export class SaisonsPage implements OnInit {

  id: string;
  season: string;
  detailsSeason: any;
  nbEpidode = [];
  episode: string;

  constructor(public api: ApiOMDbService, private route: ActivatedRoute, public navCtrl: NavController) { }

  async getInfosSeason() {
    await this.api.getDetailsSeason(this.id, this.season)
      .subscribe(res => {
        //console.log(res);

        this.detailsSeason = res;
        for (let i = 0; i < this.detailsSeason.Episodes.length ; i++){
          this.episode = this.detailsSeason.Episodes[i].Episode;
          this.nbEpidode.push(this.episode);
        }

      }, err => {
        console.log(err);
      });
  }

  envoisDetailEpisode(episode: string){
    this.navCtrl.navigate("details/" + this.id + "/season/" + this.season + "/episode/" + episode, {})
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.season = this.route.snapshot.paramMap.get('Season');
    this.getInfosSeason();
  }

}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiOMDbService } from '../api-omdb.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.page.html',
  styleUrls: ['./episodes.page.scss'],
})
export class EpisodesPage implements OnInit {

  id: string;
  season: string;
  episode: string;
  detailEpisode: any;
  detailSeason: any;
  titleSerie: string;

  constructor(public api: ApiOMDbService, private route: ActivatedRoute, public navCtrl: NavController) { }

  async getInfosEpisode() {
    await this.api.getDetailsEpisode(this.id, this.season, this.episode)
      .subscribe(res => {
        console.log(res);

        this.detailEpisode = res;

      }, err => {
        console.log(err);
      });
  }

  async getInfosSeason() {
    await this.api.getDetailsSeason(this.id, this.season)
      .subscribe(res => {
        console.log(res);

        this.detailSeason = res;
        this.titleSerie = this.detailSeason.Title;
  
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.season = this.route.snapshot.paramMap.get('Season');
    this.episode = this.route.snapshot.paramMap.get('Episode');
    this.getInfosEpisode();
    this.getInfosSeason();
  }

}

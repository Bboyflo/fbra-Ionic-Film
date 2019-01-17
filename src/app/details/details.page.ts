import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiOMDbService } from '../api-omdb.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string;
  details: any;
  constructor(public api: ApiOMDbService, private route: ActivatedRoute) {}

   async getInfos() {
    await this.api.getDetails(this.id)
      .subscribe(res => {
        //console.log(res);

        this.details = res;

      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getInfos();
  }

}

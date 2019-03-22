import { EpisodesModel } from './episodesModel';


export class SeasonsModel {
  Title: string;
  Season: string;
  totalSeasons: string;
  Episodes: Array<EpisodesModel>;
  Response: string;
}


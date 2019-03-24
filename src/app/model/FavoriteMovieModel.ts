
export class FavoriteMovieModel {
  Title: string;
  Release: string;
  imdbVotes: string;
  
  constructor(Title: string, Release: string, imdbVotes : string){
      this.Title = Title;
      this.Release = Release
      this.imdbVotes = imdbVotes
  }
}
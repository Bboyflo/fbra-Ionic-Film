import { RatingModel } from './RatingModel';

export interface MoviesIdModel {
    Title:      string;
    Year:       string;
    Rated:      string;
    Released:   string;
    Runtime:    string;
    Genre:      string;
    Director:   string;
    Writer:     string;
    Actors:     string;
    Plot:       string;
    Language:   string;
    Country:    string;
    Awards:     string;
    Poster:     string;
    Ratings:    Array<RatingModel>;
    Metascore:  string;
    imdbRating: string;
    imdbVotes:  string;
    imdbID:     string;
    Type:       string;
    DVD:        string;
    BoxOffice:  string;
    Production: string;
    Website:    string;
    Response:   string;
    totalSeasons: string;
}


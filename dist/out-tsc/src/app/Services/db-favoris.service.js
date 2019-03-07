var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
var MOVIE_KEY = "movie_";
var DbFavorisService = /** @class */ (function () {
    function DbFavorisService(storage) {
        this.storage = storage;
        //console.log("Hello UserPreferencesProvider Provider");
    }
    DbFavorisService.prototype.addFavoriteMovie = function (movie) {
        this.storage.set(this.getMovieKey(movie), JSON.stringify(movie));
    };
    DbFavorisService.prototype.removeFavoriteMovie = function (movie) {
        this.storage.remove(this.getMovieKey(movie));
    };
    DbFavorisService.prototype.isFavortieMovie = function (movie) {
        return this.storage.get(this.getMovieKey(movie));
    };
    DbFavorisService.prototype.toogleFavoriteMovie = function (movie) {
        var _this = this;
        this.isFavortieMovie(movie).then(function (isFavorite) {
            return isFavorite
                ? _this.removeFavoriteMovie(movie)
                : _this.addFavoriteMovie(movie);
        });
    };
    DbFavorisService.prototype.getMovieKey = function (movie) {
        return MOVIE_KEY + movie.imdbID;
    };
    DbFavorisService.prototype.getFavoriteMovies = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var results = [];
            _this.storage
                .keys()
                .then(function (keys) {
                return keys
                    .filter(function (key) { return key.includes(MOVIE_KEY); })
                    .forEach(function (key) {
                    return _this.storage.get(key).then(function (data) { return results.push(JSON.parse(data)); });
                });
            });
            return resolve(results);
        });
    };
    DbFavorisService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Storage])
    ], DbFavorisService);
    return DbFavorisService;
}());
export { DbFavorisService };
//# sourceMappingURL=db-favoris.service.js.map
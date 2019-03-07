var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DbFavorisService } from '../Services/db-favoris.service';
import { NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
var FavorisPage = /** @class */ (function () {
    function FavorisPage(DbFavorisService, navCtrl, file, fileChooser) {
        this.DbFavorisService = DbFavorisService;
        this.navCtrl = navCtrl;
        this.file = file;
        this.fileChooser = fileChooser;
        this.favoriteMovies = [];
        this.headerRow = [];
    }
    FavorisPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad MyMoviesPage");
    };
    FavorisPage.prototype.ionViewWillEnter = function () {
        //console.log('ionViewWillEnter');
        this.favoriteMovies = [];
        this.initFavoriteMovies();
    };
    FavorisPage.prototype.exportJSON = function () {
        if (this.favoriteMovies.length != 0) {
            this.file.writeFile(this.file.externalRootDirectory + '/Downloads/', 'JsonFavorites.json', JSON.stringify(this.favoriteMovies), { replace: true });
            alert("l'export a fonctionné");
        }
        else {
            alert("Vous n'avez pas de favoris à exporter");
        }
    };
    FavorisPage.prototype.importJSON = function () {
        this.fileChooser.open()
            .then(function (uri) { return uri; })
            .catch(function (e) { return console.log(e); });
    };
    FavorisPage.prototype.exportCSV = function () {
    };
    FavorisPage.prototype.importCSV = function () {
        this.fileChooser.open()
            .then(function (uri) { return uri; })
            .catch(function (e) { return console.log(e); });
    };
    FavorisPage.prototype.initFavoriteMovies = function () {
        var _this = this;
        this.DbFavorisService
            .getFavoriteMovies()
            .then(function (favs) { return (_this.favoriteMovies = favs); });
    };
    FavorisPage.prototype.findMovie = function () {
        //this.navCtrl.push(MovieListPage);
    };
    FavorisPage.prototype.goToDetail = function (movie) {
        console.log(movie);
        if (movie.Type == "episode") {
            this.navCtrl.navigate("details/" + movie.seriesID + "/season/" + movie.Season + "/episode/" + movie.Episode, {});
        }
        else {
            this.navCtrl.navigate("details/" + movie.imdbID, {});
        }
    };
    FavorisPage.prototype.doRefresh = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.ionViewWillEnter();
            event.target.complete();
        }, 2000);
    };
    FavorisPage.prototype.ngOnInit = function () {
    };
    FavorisPage = __decorate([
        Component({
            selector: 'app-favoris',
            templateUrl: './favoris.page.html',
            styleUrls: ['./favoris.page.scss'],
        }),
        __metadata("design:paramtypes", [DbFavorisService, NavController, File,
            FileChooser])
    ], FavorisPage);
    return FavorisPage;
}());
export { FavorisPage };
//# sourceMappingURL=favoris.page.js.map
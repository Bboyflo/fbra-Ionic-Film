var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
var apiUrl = "http://www.omdbapi.com/?apikey=75522b56";
var ApiOMDbService = /** @class */ (function () {
    function ApiOMDbService(http) {
        this.http = http;
    }
    ApiOMDbService.prototype.handleError = function (error) {
        console;
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        }
        else {
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        return throwError('Something bad happened; please try again later.');
    };
    ApiOMDbService.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    ApiOMDbService.prototype.getInfoByTitle = function (titre, type, page) {
        var url = apiUrl + "&s=" + titre + "&type=" + type + "&page=" + page;
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    ApiOMDbService.prototype.getDetails = function (id) {
        var url = apiUrl + "&i=" + id + "&plot=full";
        //console.log(url);
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    ApiOMDbService.prototype.getDetailsSeason = function (id, nbSeason) {
        var url = apiUrl + "&i=" + id + "&Season=" + nbSeason;
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    ApiOMDbService.prototype.getDetailsEpisode = function (id, nbSeason, nbEpisode) {
        var url = apiUrl + "&i=" + id + "&Season=" + nbSeason + "&episode=" + nbEpisode;
        return this.http.get(url).pipe(map(this.extractData), catchError(this.handleError));
    };
    ApiOMDbService.prototype.postInfoMovies = function (data) {
        var url = apiUrl + "/add_with_students";
        return this.http.post(url, data)
            .pipe(catchError(this.handleError));
    };
    ApiOMDbService.prototype.updateInfoMovies = function (id, data) {
        var url = apiUrl + "/" + id;
        return this.http.put(url, data)
            .pipe(catchError(this.handleError));
    };
    ApiOMDbService.prototype.deleteInfoMovies = function (id) {
        var url = apiUrl + "/" + id;
        return this.http.delete(url)
            .pipe(catchError(this.handleError));
    };
    ApiOMDbService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ApiOMDbService);
    return ApiOMDbService;
}());
export { ApiOMDbService };
//# sourceMappingURL=api-omdb.service.js.map
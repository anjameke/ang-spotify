import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

    private searchUrl: string;
    private artistUrl: string;
    private albumsUrl: string;
    private albumUrl: string;
    private clientID: string = environment.clientId;
    private clientSecret: string = environment.clientSecret;

    constructor(private _http:Http) {

    }

    getAuth = () => {

        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(this.clientID + ":" + this.clientSecret));
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let params: URLSearchParams = new URLSearchParams();
        params.set('grant_type', 'client_credentials');

        let body = params.toString();

        return this._http.post('https://accounts.spotify.com/api/token', body, { headers: headers })
            .map(res => res.json());
    }

    searchMusic(query:string, type='artist', authToken:string) {

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + authToken);

        this.searchUrl = 'https://api.spotify.com/v1/search?query=' + query + '&offset=0&limit=20&type=' + type + '&market=US';

        return this._http.get(this.searchUrl, { headers: headers })
            .map(res => res.json());
    }

    getArtist(id:string, type='artist', authToken:string) {
        
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + authToken);

        this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;

        return this._http.get(this.artistUrl, { headers: headers})
            .map(res => res.json());
    }

    getAlbums(artistId:string, authToken:string) {
        
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + authToken);

        this.albumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';

        return this._http.get(this.albumsUrl, { headers: headers })
            .map(res => res.json());
    }

    getAlbum(albumId:string, authToken:string) {

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + authToken);
        
        this.albumUrl = 'https://api.spotify.com/v1/albums/' + albumId;
        
        return this._http.get(this.albumUrl, { headers: headers })
            .map(res => res.json());
    }
}
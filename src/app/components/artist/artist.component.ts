import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/Artist';
import { Album } from '../../models/Album';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'artist',
  templateUrl: 'artist.component.html',
  providers: [SpotifyService]
})
export class ArtistComponent implements OnInit {
  
    public id: string;
    
    // currently lazy and i don't wanna make all of spotify's associated classes w/n
    // the model folder. This is json anyways, might as well just parse.
    public artist: any;
    public albums: any;

    constructor(private spotifyService:SpotifyService,
                private route:ActivatedRoute) { }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.spotifyService.getAuth()
                    .subscribe(res => {
                        this.spotifyService.getArtist(id, 'artist', res.access_token)
                        .subscribe(artist => {
                            this.artist = artist;
                        });
                        this.spotifyService.getAlbums(id, res.access_token)
                        .subscribe(albums => {
                            this.albums = albums.items;
                        });
                    });
            });
    }
}

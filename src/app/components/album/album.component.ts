import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Artist } from '../../models/Artist';
import { Album } from '../../models/Album';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'album',
  templateUrl: 'album.component.html',
  providers: [SpotifyService]
})
export class AlbumComponent implements OnInit {
  
    public id: string;
    
    // currently lazy and i don't wanna make all of spotify's associated classes w/n
    // the model folder. This is json anyways, might as well just parse.
    public album: Map<any, any>;

    constructor(private spotifyService:SpotifyService,
                private route:ActivatedRoute) { }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.spotifyService.getAuth()
                    .subscribe(res => {
                        this.spotifyService.getAlbum(id, res.access_token)
                        .subscribe(album => {
                            console.log(album.items);
                            this.album = album;
                        });
                    });
            });
    }
}

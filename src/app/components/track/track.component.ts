import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'track',
  templateUrl: 'track.component.html',
  providers: [SpotifyService]
})
export class TrackComponent implements OnInit {
  
    public id: string;
    
    // currently lazy and i don't wanna make all of spotify's associated classes w/n
    // the model folder. This is json anyways, might as well just parse.
    public track: any;
    // public albums: Array<Map<any, any>>;

    constructor(private spotifyService:SpotifyService,
                private route:ActivatedRoute) { }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.spotifyService.getAuth()
                    .subscribe(res => {
                        this.spotifyService.getTrack(id, res.access_token)
                            .subscribe(track => {
                                this.track = track;
                            });
                    });
            });
    }
}

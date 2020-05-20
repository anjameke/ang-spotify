import { Component, OnInit, ChangeDetectorRef, Input, Output, Directive } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/internal/operators';
import { forbiddenCharacterValidator } from '../../validators/forbiddenCharacterValidator';

@Component({
  selector: 'playlist',
  templateUrl: 'playlist.component.html',
  providers: [SpotifyService]
})


export class PlaylistComponent implements OnInit {

  public query: FormControl = new FormControl("", [Validators.minLength(1)]);
  public name: FormControl = new FormControl("", Validators.required);

  public trackUris: any;
  public playlistId: string;
  public playlistUri: string;

  constructor(private spotifyService: SpotifyService,
              private cd: ChangeDetectorRef) {

  }

  ngOnInit() {

    // this.search.get('isSearch').valueChanges.pipe(distinctUntilChanged());
    // this.search.get('searchQuery').valueChanges

    this.name.valueChanges
      .pipe(
        filter(input => input.length >=1 ),
        debounceTime(400),
        distinctUntilChanged()
      )
    this.query.valueChanges
      .pipe(
        filter(input => input.length >= 1),
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(res => {console.log(this.query.value); console.log(this.query.errors)});
  }

  onSubmit() {
    let trackNames = this.query.value.split(",")
    this.query.valueChanges.subscribe(q => 
        this.spotifyService.getAuth()
            .subscribe(res => 
              this.spotifyService.createPlaylist(this.name.value, true, '', res.access_token)
              .subscribe(res => {
                this.playlistId = res.id;
                this.playlistUri = res.external_urls.spotify;
                trackNames.forEach(trackName => {
                  this.trackUris.push(
                    this.spotifyService.searchMusic(trackName, 'track', res.access_token)
                      .subscribe(res => {
                        res.items.external_urls.spotify;}))
                  this.spotifyService.addTrackToPlaylist(this.playlistId, res.access_token, this.trackUris.join())
                  
                })
              })))
              
  }
}

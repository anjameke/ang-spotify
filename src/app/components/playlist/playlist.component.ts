import { Component, OnInit, ChangeDetectorRef, Input, Output, Directive } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/internal/operators';
import { Artist } from '../../models/Artist';

@Component({
  selector: 'playlist',
  templateUrl: 'playlist.component.html',
  providers: [SpotifyService]
})


export class PlaylistComponent implements OnInit {

  // public searchStr: string;
  public results: any;
  public query: FormControl = new FormControl("", Validators.minLength(1));

  public searchType: string;

  public search: FormGroup = new FormGroup({
      searchAllowed: new FormControl(this.searchType, Validators.required),
      searchQuery: new FormControl("", Validators.minLength(1)),
      isSearch: new FormControl(this.searchType, Validators.required)
  });

  constructor(private spotifyService: SpotifyService,
              private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    // this.search.get('isSearch').valueChanges.pipe(distinctUntilChanged());
    // this.search.get('searchQuery').valueChanges
    // // this.query.valueChanges
    //   .pipe(
    //     filter(input => input.length >= 1),
    //     debounceTime(400),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(query => this.spotifyService.getAuth()
    //     .subscribe(res => this.spotifyService.searchMusic(query, this.searchType, res.access_token).subscribe(
    //       res => {
    //         console.log(this.searchType);
    //         if (this.searchType === 'artist') {
    //           this.results = res.artists.items
    //         } else {
    //           // /v1/search returns albums info with the tracks blurb, let's purge those so that
    //           // calling track.id is accurate.
    //           this.results = res.tracks.items.map(({album, ...items}) => items);
    //         }
    //         console.log(this.results);
    //       })
    //     ));
  }

//   onSearchChange(search:string) {
//     this.searchType = search;
//     this.cd.markForCheck();
//   }

}

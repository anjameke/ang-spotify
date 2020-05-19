import { Component, OnInit, ChangeDetectorRef, Input, Output, Directive } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/internal/operators';
import { Artist } from '../../models/Artist';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
  providers: [SpotifyService]
})


export class SearchComponent implements OnInit {

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
    this.checkSearch();
    this.search.get('isSearch').valueChanges.pipe(distinctUntilChanged());
    this.search.get('searchQuery').valueChanges
      .pipe(
        filter(input => input.length >= 1),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(query => this.spotifyService.getAuth()
        .subscribe(res => this.spotifyService.searchMusic(query, this.searchType, res.access_token).subscribe(
          res => {
            console.log(this.searchType);
            if (this.searchType === 'artist') {
              this.results = res.artists.items
            } else {
              // /v1/search returns albums info with the tracks blurb, let's purge those so that
              // calling track.id is accurate.
              this.results = res.tracks.items.map(({album, ...items}) => items);
            }
          })
        ));
  }

  onSearchChange(search:string) {
    this.searchType = search;
    this.cd.markForCheck();
  }

  checkSearch() {
    this.search.get('searchAllowed').valueChanges.
      subscribe(searchable => {
        if (this.isNotSearchable()) {
          this.search.get('searchAllowed').reset();
          this.search.get('searchAllowed').disable();
        } else {
          this.search.get('searchAllowed').enable();
        }
      });
  }

  public isNotSearchable() {
    return !this.searchType || this.searchType.length === 0;
  }

  public isArtistSearch() {
    return this.searchType === 'artist';
  }
}

import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { Artist } from '../../models/Artist';

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss'],
  providers: [SpotifyService]
})
export class SearchComponent implements OnInit {

  public searchStr: string;
  public results: Artist[];
  public query: FormControl = new FormControl();

  constructor(private spotifyService: SpotifyService) {

  }

  ngOnInit() {
    this.query.valueChanges
      .pipe(debounceTime(400),
            distinctUntilChanged()
      )
      .subscribe(query => this.spotifyService.getAuth()
        .subscribe(res => this.spotifyService.searchMusic(query, 'artist', res.access_token).subscribe(
          res => {
            console.log(res.artists.items)
            this.results = res.artists.items
          })
        ));
  }

  // searchMusic() {
  //   console.log(this.searchStr);
  //   // this.spotifyService.getAuth()
  //   //   .subscribe(res => this.spotifyService.searchMusic(this.query, 'artist', res.access_token)
  //   //     .subscribe(res =>
  //   //       console.log(res.artists.items))
  //   //   )
  // }
}

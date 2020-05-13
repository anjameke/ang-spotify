import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { AlbumComponent } from './album/album.component';
import { TrackComponent } from './track/track.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SpotifyService } from '../services/spotify.service'
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpModule, SpotifyService]
})
export class AppComponent {
  title = 'ang-spotify';
}

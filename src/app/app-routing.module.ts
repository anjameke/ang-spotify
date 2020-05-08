import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';
import { ArtistComponent } from './components/artist/artist.component';
import { NoPageFoundComponent } from './components/noPageFound/noPageFound.component';

const routes: Routes = [
  { path: '', component:SearchComponent},
  { path: 'about', component:AboutComponent},
  { path: 'artist/:id', component: ArtistComponent},
  { path : '**', component:NoPageFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

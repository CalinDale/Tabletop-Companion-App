import { CharacterPageComponent } from './../character-page/character-page.component';
import { CharactersComponent } from './../characters/characters.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackerComponent } from '../tracker/tracker.component';

// fill in with { path: 'pathname', component: ComponentName } when adding routes.
const routes: Routes = [
  { path: 'tracker', component: TrackerComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'character/:charId', component: CharacterPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

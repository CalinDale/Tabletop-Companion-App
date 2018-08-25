import { AddAttributeComponent } from './../add-attribute/add-attribute.component';
import { CreateCharacterComponent } from './../create-character/create-character.component';
import { CharacterPageComponent } from './../character-page/character-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackerComponent } from '../tracker/tracker.component';

// fill in with { path: 'pathname', component: ComponentName } when adding routes.
const routes: Routes = [
  { path: 'tracker', component: TrackerComponent },
  { path: 'characters', component: CharacterPageComponent },
  { path: 'add', component: CreateCharacterComponent },
  { path: 'addattribute', component: AddAttributeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

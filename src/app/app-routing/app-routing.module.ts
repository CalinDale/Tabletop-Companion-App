import { ViewSingleCharacterComponent } from './../view-single-character/view-single-character.component';
import { AddAttributeComponent } from './../add-attribute/add-attribute.component';
import { CreateCharacterComponent } from './../create-character/create-character.component';
import { CharacterPageComponent } from './../character-page/character-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { TrackerComponent } from '../tracker/tracker.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AuthGuard } from '../core/auth.guard';
import { EditAttributeComponent } from '../edit-attribute/edit-attribute.component';
import { EditCharacterComponent } from '../edit-character/edit-character.component';
import { ViewTrackerComponent } from '../view-tracker/view-tracker.component';

// fill in with { path: 'pathname', component: ComponentName } when adding routes.
const routes: Routes = [
  { path: 'tracker', component: TrackerComponent, canActivate: [AuthGuard] },
  { path: 'characters', component: CharacterPageComponent, canActivate: [AuthGuard] },
  { path: 'add', component: CreateCharacterComponent, canActivate: [AuthGuard] },
  { path: 'addattribute', component: AddAttributeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UserProfileComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'getCharacter', component: ViewSingleCharacterComponent},
  { path: 'editattribute', component: EditAttributeComponent},
  { path: 'editcharacter', component: EditCharacterComponent},
  { path: 'viewtracker', component: ViewTrackerComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

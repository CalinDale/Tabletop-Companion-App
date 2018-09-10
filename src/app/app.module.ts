import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { environment } from '../environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { CharacterPageComponent } from './character-page/character-page.component';
import { TrackerComponent } from './tracker/tracker.component';
import { MessagesComponent } from './messages/messages.component';
import { CreateCharacterComponent } from './create-character/create-character.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoreModule } from './core/core.module';
import { RegisterComponent } from './register/register.component';
import { ViewSingleCharacterComponent } from './view-single-character/view-single-character.component';
import { SingleCharacterDetailsComponent } from './single-character-details/single-character-details.component';
import { EditAttributeComponent } from './edit-attribute/edit-attribute.component';
import { EditCharacterComponent } from './edit-character/edit-character.component';
import { GiveTrackerComponent } from './give-tracker/give-tracker.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterPageComponent,
    TrackerComponent,
    MessagesComponent,
    CreateCharacterComponent,
    CharacterDetailsComponent,
    AddAttributeComponent,
    UserProfileComponent,
    RegisterComponent,
    ViewSingleCharacterComponent,
    SingleCharacterDetailsComponent,
    EditAttributeComponent,
    EditCharacterComponent,
    GiveTrackerComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    CoreModule,

  ],
  providers: [AddAttributeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

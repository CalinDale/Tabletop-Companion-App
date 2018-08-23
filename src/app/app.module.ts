import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { CharactersComponent } from './characters/characters.component';
import { CharacterPageComponent } from './character-page/character-page.component';
import { TrackerComponent } from './tracker/tracker.component';
import { MessagesComponent } from './messages/messages.component';

import {Location} from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterPageComponent,
    TrackerComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule { }

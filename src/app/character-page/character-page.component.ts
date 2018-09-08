import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { CharacterService } from './../character.service';
import { MessageService } from '../message.service';
import { AttributeService } from '../attribute.service';
import { Character } from '../character';
import { Router } from '@angular/router';


@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.css']
})
export class CharacterPageComponent implements OnInit {

  @Input() character: Character;

  characters: any;

  constructor(
    private characterService: CharacterService,
    private attributeService: AttributeService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCharactersList();
  }


  getCharactersList() {
    // TODO: using this if statement prevents TypeError: Cannot read property 'snapshotChanges' of undefined.
    // TODO: However, it does currently break the code, so we need to find another way.
    // if (this.characterService.getCharactersList === undefined) {
    this.characterService.getCharactersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(characters => {
      this.characters = characters;
    });
    // }
  }

  deleteCharacters() {
    this.characterService.deleteAll();
  }

  viewTracker() {
    this.router.navigateByUrl('viewtracker');
  }


}

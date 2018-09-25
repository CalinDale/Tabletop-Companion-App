import { Attribute } from './attribute';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { CharacterService } from './character.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private dbPath = '/attributes';

  userID: string;
  characterID: string;
  attributeID: string;
  attribute: Attribute;

  attributesRef: AngularFireList<Attribute> = null;
  attributeRef: AngularFireObject<Attribute> = null;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private characterService: CharacterService) {
    this.afAuth.authState.subscribe(user => {
      if (user) { this.userID = user.uid; }
    });
  }

  setAttributeID(key: string) {
    if (key != null) {
      this.attributeID = key;
    }
  }

  getAttributeID() {
    return this.attributeID;
  }

  getAttributes(key: string): AngularFireList<Attribute> {
    // tslint:disable-next-line:curly
    if (!this.userID) return;
    this.attributesRef = this.db.list(`attributes/${this.userID}/${key}/`);
    return this.attributesRef;
  }

  getAttributesTracker() {
    this.characterID = this.characterService.getCharacterID();
    if (!this.userID) {
      return;
    } else {
      this.attributesRef = this.db.list(`attributes/${this.userID}/${this.characterID}`
      , ref => ref.orderByChild('tracked').equalTo(true));
      return this.attributesRef;
    }
  }

  getAttributesNotTracked() {
    this.characterID = this.characterService.getCharacterID();
    if (!this.userID) {
      return;
    } else {
      this.attributesRef = this.db.list(`attributes/${this.userID}/${this.characterID}`
      , ref => ref.orderByChild('tracked').equalTo(false));
      return this.attributesRef;
    }
  }

  createAttribute(attribute: Attribute): void {
    this.characterID = this.characterService.getCharacterID();
    this.attributesRef = this.db.list(`attributes/${this.userID}/${this.characterID}`);
    this.attributesRef.push(attribute);
  }

  cloneAttributes(attribute: any, characterID: string): void {
    this.attributesRef = this.db.list(`attributes/${this.userID}/${characterID}`);
    attribute.forEach(element => {
      this.attribute = element;
      this.attribute.characterID = characterID;
      this.attribute.key = null;
      this.attributesRef.push(this.attribute);
    });
  }

  // TODO: this.db.object is not a function?
  // Changed a piece of code to have the attributeService pull the ID of the attribute being updated
  // Why does it even pull the characterID when updating?
  updateAttribute(attribute: Attribute): void {
    // God dammit
    this.characterID = this.characterService.getCharacterID();

    // Adding this part so I don't need to set the characterService ID every time I update an attribute.
    // With the if statement it shouldn't break code that still relys on the old way.
    if ( attribute.characterID !== undefined) {
      this.characterID = attribute.characterID;
    }
    this.setAttributeID(attribute.key);
    this.attributeRef = this.db.object(`attributes/${this.userID}/${this.characterID}/${this.attributeID}`);
    this.attributeRef.update(attribute).catch(error => this.handleError(error));
  }

  trackAttribute(attribute: Attribute) {
    attribute.tracked = true;
    this.updateAttribute(attribute);
  }

  untrackAttribute(attribute: Attribute) {
    attribute.tracked = false;
    this.updateAttribute(attribute);
  }

  // switched name for key since that's what it actually uses.
  deleteAttribute(key: string): void {
    this.attributesRef.remove(key).catch(error => this.handleError(error));
  }

  deleteAll(): void {
    this.attributesRef.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }

}



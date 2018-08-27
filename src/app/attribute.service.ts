import { Attribute } from './attribute';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private dbPath = '/attributes';

  attributesRef: AngularFireList<Attribute> = null;

  constructor(
    private db: AngularFireDatabase
  ) { this.attributesRef = db.list(this.dbPath); }

  createAttribute(attribute: Attribute): void {
    this.attributesRef.push(attribute);
  }


  updateAttribute(name: string, value: any): void {
    this.attributesRef.update(name, value).catch(error => this.handleError(error));
  }

  deleteAttribute(name: string): void {
    this.attributesRef.remove(name).catch(error => this.handleError(error));
  }

  getAttributesList(): AngularFireList<Attribute> {
    return this.attributesRef;
  }

  deleteAll(): void {
    this.attributesRef.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }

}



import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class TurnOrderService {
  private actingPosition = 0;


  constructor() { }

}

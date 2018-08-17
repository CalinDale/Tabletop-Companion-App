import { Character } from './../character';
import { TurnOrderService } from './../turn-order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  characters: Character[];
  actingPosition: number;

  constructor(private turnOrderService: TurnOrderService) {}

  ngOnInit() {
    this.getTurnOrder();
  }

  getTurnOrder(): void {
    this.turnOrderService.getCharacters().subscribe(characters => this.characters = characters);
    this.turnOrderService.getActingPosition().subscribe(actingPosition => this.actingPosition = actingPosition);
  }

}

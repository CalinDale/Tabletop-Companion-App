import { Character } from './../character';
import { TurnOrderService } from './../turn-order.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  characters: Character[];
  actingPosition: number;

  constructor(
    private turnOrderService: TurnOrderService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getTurnOrder();
  }

  getTurnOrder(): void {
    this.turnOrderService.getCharacters().subscribe(characters => this.characters = characters);
    this.turnOrderService.getActingPosition().subscribe(actingPosition => this.actingPosition = actingPosition);
  }

  nextTurn(): void {
    this.messageService.add('Go to Next turn');
  }

  previousTurn(): void {
    this.messageService.add('Go to Previous turn');
  }

  removeCharacter(): void {
    this.messageService.add('Remove Character from turn order');
  }

  moveCharacter(): void {
    this.messageService.add('Move character in turn order.');
  }

}

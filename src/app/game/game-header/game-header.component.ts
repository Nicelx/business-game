import { Component, OnInit } from '@angular/core';
import { PlayerData } from '../interfaces/game.interfaces';
import { PlayerDataService } from '../services/player-data.service';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.css']
})
export class GameHeaderComponent implements OnInit {
  player: PlayerData = {
    playerId: 0,
    playerName: '',
    money: 0,
    businessUnits: []
  }
  constructor(private playerService: PlayerDataService) { }

  ngOnInit(): void {
    this.player = this.playerService.getPlayer(0);
  }

}

import { Component, OnInit } from '@angular/core';
import { PlayerData } from './../interfaces/game.interfaces';

@Component({
  selector: 'app-creation-model',
  templateUrl: './creation-model.component.html',
  styleUrls: ['./creation-model.component.css']
})
export class CreationModelComponent implements OnInit {

  activePlayer: PlayerData | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onBusinessAdd() {
		this.playerService.addBusinessUnit({ unitId: 0, sellingType: "retail", type: "apples", earned: 0, incomePerTick: 0 }, 0);
		this.marketService.changeAmplifier("apples", 1);
	}

}

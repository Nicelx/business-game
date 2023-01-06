import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MarketService } from '../services/market.service';
import { PlayerDataService } from '../services/player-data.service';
import { PlayerData } from './../interfaces/game.interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-creation-model',
  templateUrl: './creation-model.component.html',
  styleUrls: ['./creation-model.component.css']
})
export class CreationModelComponent implements OnInit {

  activePlayer: PlayerData | null = null;
  optionForm = new FormGroup({

  })
  
  @Output() close: EventEmitter<any> = new EventEmitter();


  constructor(private playerService: PlayerDataService, private marketService: MarketService) { }

  ngOnInit(): void {
  }

  onBusinessAdd() {
		
	}

  onModalCancel() {
    this.close.emit(true);
  }

  onCreate() {
    this.playerService.addBusinessUnit({ unitId: 0, sellingType: "retail", type: "apples", earned: 0, incomePerTick: 0 }, 0);
		this.marketService.changeAmplifier("apples", 1);
  }

}

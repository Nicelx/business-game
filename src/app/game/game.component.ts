import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MarketService } from "./services/market.service";
import { PlayerDataService } from "./services/player-data.service";
import { PlayerData, Trait, isTraitType, traitString } from "./interfaces/game.interfaces";
import { arrayMinusArray } from "./../functions";
import { traitStringArray } from "./interfaces/game.interfaces";

@Component({
	selector: "app-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.css"],
})
export class GameComponent implements OnInit {
	isModalVisible = false;
	modalType: string = "";
	creatingCost: number = 1;
	gameId: number | null = null;
	activePlayer: PlayerData = {
		playerId: 0,
		playerName: "",
		money: 0,
		businessUnits: [],
		playerIncomePerTick: 0,
		traits: [],
	};
	traitSelected = traitStringArray[0];
	availableTraits : traitString[] = [];
	
	constructor(
		private route: ActivatedRoute,
		private marketService: MarketService,
		private playerService: PlayerDataService
	) {
		playerService.updatePlayerMoney();
	}

	ngOnInit(): void {
		const routeParams = this.route.snapshot.paramMap;
		this.gameId = Number(routeParams.get("gameId"));
		this.activePlayer = this.playerService.getMainPlayer();
		this.availableTraits = [...traitStringArray];
	}

	onGatherOpen() {
		this.isModalVisible = true;
		this.modalType = "Добыча";
	}
	onClose() {
		this.isModalVisible = false;
	}

	onTraitSelection(value: any) {
		this.traitSelected = value;
		console.log('selected', value)
		console.log('traitSelected', this.traitSelected)
	}

	// filterTraits(fullArray: Trait[], toReduceArray: Trait[]) {
	// 	if (!isTraitType(fullArray) || !isTraitType(toReduceArray)) throw new Error('wrong array type here')

	// 	return arrayMinusArray(fullArray, toReduceArray)
	// }
	onAddTrait() {
		this.activePlayer.traits.push({
			name: this.traitSelected,
			level: 1,
		});
		
		this.availableTraits.findIndex()
		this.availableTraits.slice
		// arrayMinusArray(["One", "Two", "Three"], ["Two"]);
		console.log(this.activePlayer);
	}
}

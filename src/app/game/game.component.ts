import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MarketService } from "./services/market.service";
import { PlayerDataService } from "./services/player-data.service";
import { PlayerData, traitString } from "./interfaces/game.interfaces";
import { traitStringArray } from "./interfaces/game.interfaces";
import { TraitService } from './services/traits.service';

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
	availableTraits: traitString[] = [];

	constructor(
		private route: ActivatedRoute,
		private marketService: MarketService,
		private playerService: PlayerDataService,
		private traitService: TraitService,
	) {
		playerService.updatePlayerMoney();
	}

	ngOnInit(): void {
		const routeParams = this.route.snapshot.paramMap;
		this.gameId = Number(routeParams.get("gameId"));
		this.activePlayer = this.playerService.getMainPlayer();
		this.availableTraits = [...traitStringArray];
		console.log(this.traitSelected);
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
	}

	onAddTrait() {
		let buyingBool = this.playerService.buyTrait(this.traitSelected, 0, 1);

		// if (buyingBool) {
		// 	const traitIndex = this.availableTraits.findIndex(
		// 		(element) => element === this.traitSelected
		// 	);
		// 	this.availableTraits.splice(traitIndex, 1);
		// 	this.traitSelected = this.availableTraits[0];
		// }
		console.log(this.playerService.getPlayer(0));
	}
	onImproveTrait() {
		// to do change passed level
		let trait = this.traitService.checkTrait(this.traitSelected);
		console.log('onImproveTrait() ', trait)
		if (!trait) return;
		this.playerService.buyTrait(this.traitSelected, 0, trait.level+1);
	}
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MarketService } from "./services/market.service";
import { PlayerDataService } from "./services/player-data.service";
import { PlayerData, traitString } from "./interfaces/game.interfaces";
import { traitStringArray } from "./interfaces/game.interfaces";
import { TraitService } from "./services/traits.service";

@Component({
	selector: "app-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.css"],
})
export class GameComponent implements OnInit {
	isModalVisible = false;
	modalType: 'createModal' | 'traits' | '' = "";
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
	traitCost: number = 0;
	isAddCheck = false;
	

	constructor(
		private route: ActivatedRoute,
		private marketService: MarketService,
		private playerService: PlayerDataService,
		private traitService: TraitService
	) {
		playerService.updatePlayerMoney();
	}

	ngOnInit(): void {
		const routeParams = this.route.snapshot.paramMap;
		this.gameId = Number(routeParams.get("gameId"));
		this.activePlayer = this.playerService.getMainPlayer();
		this.availableTraits = [...traitStringArray];
		this.traitCost = this.traitService.getTraitCost(this.availableTraits[0]);
	}

	onGatherOpen() {
		this.isModalVisible = true;
		this.modalType = "createModal";
	}
	onTraitOpen() {
		this.isModalVisible = true;
		this.modalType = 'traits'
	}
	onClose() {
		this.isModalVisible = false;
	}

	onTraitSelection(value: any) {
		this.traitSelected = value;
		this.traitCost = this.traitService.getTraitCost(this.traitSelected);
		if (this.traitService.checkTrait(this.traitSelected)) {
			this.isAddCheck = true;
		} else {
			this.isAddCheck = false;
		}
	}

	onAddTrait() {
		let buyingBool = this.playerService.buyTrait(this.traitSelected, 0, 1);
		if (buyingBool) this.traitCost = this.traitService.getTraitCost(this.traitSelected);

		// to do implement check
		this.isAddCheck = true;
	}
	onImproveTrait() {
		let trait = this.traitService.checkTrait(this.traitSelected);
		if (!trait) return;
		this.playerService.buyTrait(this.traitSelected, 0, trait.level + 1);
		this.traitCost = this.traitService.getTraitCost(this.traitSelected);
	}
}

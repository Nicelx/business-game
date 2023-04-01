import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MarketService } from "./services/market.service";
import { PlayerDataService } from "./services/player-data.service";
import { PlayerData } from "./interfaces/game.interfaces";

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
		traits: []
	};

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
	}

	onGatherOpen() {
		this.isModalVisible = true;
		this.modalType = "Добыча";
	}
	onClose() {
		this.isModalVisible = false;
	}

}

import { Injectable } from "@angular/core";
import { PlayerDataService } from "./player-data.service";
import { PlayerData } from "../interfaces/game.interfaces";

@Injectable()
export class BotsService {
	constructor(private playerService: PlayerDataService) {}

	bots: PlayerData[] = [
		{
			playerId: 1,
			playerName: "bot",
			money: 10000,
			businessUnits: [],
			playerIncomePerTick: 0,
			traits: [],
		},
	];

	public getBots() {
		return this.bots
	}
}

import { Injectable } from "@angular/core";
import { PlayerDataService } from "./player-data.service";
import { PlayerData } from "../interfaces/game.interfaces";
import { unitType } from "../interfaces/game.interfaces";

const variator = {
	generalAi: {
		toChooseArray : ['buildRetail', 'buildProduction', 'upgrade', 'trait'],
		toBuildArray: ['apples', 'apples', 'juice', 'iron'],
		toUpgradeArray: ['apples', 'juice', 'iron']
	},
};

@Injectable({
	providedIn: "root",
})
export class BotsService {
	constructor() {
		this.initBotsLogic();
	}

	bots: PlayerData[] = [
		{
			playerId: 1,
			playerName: "bot",
			money: 10000,
			businessUnits: [
				{
					unitId: 1,
					sellingType: "retail",
					type: ["apples"],
					earned: 0,
					amount: 1,
					incomePerTick: 0,
					expensePerTick: 0,
					revenuePerTick: 0,
				},
			],
			playerIncomePerTick: 0,
			traits: [],
		},
	];

	private initBotsLogic() {
		setInterval(() => {
			this.bots[0].businessUnits[0].amount++;
		}, 1000);
	}

	private chooseAction() {
		Math.random()
	}

	private chooseType() {

	}

	public getBots() {
		return this.bots;
	}
}

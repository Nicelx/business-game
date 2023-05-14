import { Injectable } from "@angular/core";
import { PlayerDataService } from "./player-data.service";
import { PlayerData } from "../interfaces/game.interfaces";
import { unitType } from "../interfaces/game.interfaces";

const variator = {
	generalAi: {
		

		// types: [
		// 	{
		// 		type: "apples",
		// 		chance: 1,
		// 	},
		// 	{
		// 		type: "iron",
		// 		chance: 1,
		// 	},
		// 	{
		// 		type: "juice",
		// 		chance: 1,
		// 	},
		// ],
		// typesChancesSum: 3,
		// traits: [
		// 	{
		// 		trait: "RevenuePlus",
		// 		chance: 1,
		// 	},
		// 	{
		// 		trait: "ExpensesPlus",
		// 		chance: 1,
		// 	},
		// 	{
		// 		trait: "IncomePlus",
		// 		chance: 1,
		// 	},
		// 	{
		// 		trait: "CheapBuilding",
		// 		chance: 1,
		// 	},
		// ],
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

	public getBots() {
		return this.bots;
	}
}

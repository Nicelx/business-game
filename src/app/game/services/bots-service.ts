import { Injectable } from "@angular/core";
import { PlayerDataService } from "./player-data.service";
import { BusinessUnit, PlayerData } from "../interfaces/game.interfaces";
import { unitType } from "../interfaces/game.interfaces";
import { randomArrayElement } from "src/app/functions";

type chooseAction = 'buildRetail'| 'buildProduction' | 'upgrade' | 'trait' | 'none' | 'extend' | 'correction'

const variator = {
	generalAi: {
		toChooseArray : ['buildRetail', 'buildProduction', 'upgrade', 'upgrade', 'upgrade', 'upgrade', 'trait', 'none', 'extend', 'extend','extend','extend'],
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
		setInterval(this.chooseAction.bind(this), 2000);
	}

	private chooseAction() {
		let option = randomArrayElement(variator.generalAi.toChooseArray);

		if ((option === 'buildRetail') || (option === 'buildProduction') || (option === 'upgrade') ) {
			this.chooseType(option)
		}
	}

	chooseType(option: chooseAction) {
		const {toBuildArray, toUpgradeArray} = variator.generalAi;
		if ('buildProduction') {
			let type = toBuildArray[Math.floor(Math.random()* toBuildArray.length)]
			console.log('chooseType', type)
			this.AddBusinessUnit(type as unitType)
		}
		if ('buildRetail') {

		}
		if ('upgrade') {

		}
		console.log('chooseType log')
	}

	private chooseTrait() {

	}

	private AddBusinessUnit(type:unitType) {
		this.bots[0].businessUnits.push({
			amount : 1,
			earned: 0,
			expensePerTick: 0,
			incomePerTick: 0,
			revenuePerTick: 0,
			sellingType: 'market',
			unitId : Math.floor(Math.random()*100000),
			type: [type]
		})
	}

	public getBots() {
		return this.bots;
	}
}

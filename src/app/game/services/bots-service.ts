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
		setInterval(this.chooseAction, 1000);
	}

	private chooseAction() {
		let choosedNumber =Math.floor(Math.random()* 4)
		switch(variator.generalAi.toChooseArray[choosedNumber]) {
			case 'buildRetail' : console.log('buildRetail')
			break;
			case 'buildProduction' : console.log('buildProduction')
			break;
			case 'upgrade' : console.log('upgrade')
			break;
			case 'trait' : console.log('trait')
			break;
			default : console.log('default') 
		}
	}

	private chooseType(option: string) {
		const {toBuildArray, toUpgradeArray} = variator.generalAi;
		if ('toBuildProduction') {
			toBuildArray[Math.floor(Math.random()* toBuildArray.length)]
		}
		if ('toBuildRetail') {}
		if ('upgrade') {}
		console.log('chooseType log')
	}

	private chooseTrait() {

	}

	private AddBusinessUnit() {
		
	}

	public getBots() {
		return this.bots;
	}
}

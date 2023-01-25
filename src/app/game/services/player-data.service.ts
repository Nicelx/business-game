import { Injectable } from "@angular/core";
import { BusinessUnit, PlayerData, sellingType, unitType } from "./../interfaces/game.interfaces";
import { BusinessUnitsService } from "./business-units.service";
import { MarketService } from "./market.service";

@Injectable({
	providedIn: "root",
})
export class PlayerDataService {
	constructor(
		private marketService: MarketService,
		private businessUnitsService: BusinessUnitsService
	) {}

	playersData: PlayerData[] = [
		{
			playerId: 0,
			playerName: "player",
			money: 0,
			businessUnits: [
				{
					unitId: 0,
					type: "apples",
					sellingType: "retail",
					earned: 0,
					incomePerTick: 0,
				},
			],
			playerIncomePerTick: 0
		},
	];
	moneyChanges: number = 0;

	getPlayer(playerId: number) {
		const player = this.playersData.find((item) => item.playerId === playerId);
		if (!player) throw new Error("Player doesnt exist");
		return player;
	}

	public getMainPlayer() {
		return {
			...this.playersData[0],
		};
	}

	updatePlayerMoney() {
		this.playersData.forEach((player) => {
			let moneyChange = 0;
			player.businessUnits.forEach((bizUnit, index) => {
				let income = this.businessUnitsService.calculateIncome(bizUnit);
				if (income === undefined) return;

				moneyChange += income;
				bizUnit.incomePerTick = +income.toFixed(2);
				bizUnit.earned = +(bizUnit.earned + income).toFixed(2);
			});
			player.money = +(player.money + moneyChange).toFixed(2);
			player.playerIncomePerTick = +moneyChange.toFixed(2)
		});
	}

	public addBusinessUnit(unit: BusinessUnit, playerId: number, type: unitType, sellingType: sellingType) {
		this.playersData[playerId].businessUnits.push(unit);
		this.marketService.changeAmplifier(type, sellingType);
		// this.marketService.changeAmplifier(type, 1, sellingType);

		// if (sellingType === 'retail') {
		// 	this.marketService.changeAmplifier(type, -1, 'retail')
		// 	return;
		// }

		// let needs = this.businessUnitsService.getprodNeeds(type);
		// if (!needs) return;
		// needs.forEach(need => {
		// 	this.marketService.changeAmplifier(need.type, need.amplifierEffect, 'market')
		// })
	}

	public deleteBusinessUnit(unitId: number) {
		this.playersData[0].businessUnits.forEach((bizUnit, index) => {
			if (bizUnit.unitId === unitId) {
				this.playersData[0].businessUnits.splice(index, 1);
				this.marketService.decreaseAmplifier(bizUnit.type, bizUnit.sellingType )
			}
		})
	}
}

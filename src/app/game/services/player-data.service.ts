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
					expensePerTick: 0,
					revenuePerTick: 0,
				},
			],
			playerIncomePerTick: 0,
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
				const incomeObj = this.businessUnitsService.calculateIncome(bizUnit);
				if (!incomeObj) return;
				let {income, expense, revenue} = incomeObj;

				moneyChange += income;
				bizUnit.incomePerTick = +income.toFixed(2);
				bizUnit.expensePerTick = +expense.toFixed(2);
				bizUnit.revenuePerTick = +revenue.toFixed(2);
				bizUnit.earned = +(bizUnit.earned + income).toFixed(2);
			});
			player.money = +(player.money + moneyChange).toFixed(2);
			player.playerIncomePerTick = +moneyChange.toFixed(2);
		});
	}

	public addBusinessUnit(
		unit: BusinessUnit,
		playerId: number,
		type: unitType,
		sellingType: sellingType
	) {
		let buildingCost = this.businessUnitsService.getBuildingCost(type);
		if (buildingCost > this.playersData[playerId].money) return;


		this.playersData[playerId].businessUnits.push(unit);
		this.playersData[playerId].money -=buildingCost;

		this.marketService.changeAmplifier(type, sellingType, -1);

		if (sellingType === "retail") {
			this.marketService.changeAmplifier(type, "market", 1);
			return;
		}

		if (sellingType === "market") {
			let needs = this.businessUnitsService.getprodNeeds(type);

			if (!needs) return;
			needs.forEach((need) => {
				console.log(need);
				this.marketService.changeAmplifier(need.type, "market", need.amplifierEffect);
			});
		}
	}

	public deleteBusinessUnit(unitId: number) {
		this.playersData[0].businessUnits.forEach((bizUnit, index) => {
			if (bizUnit.unitId === unitId) {
				this.playersData[0].businessUnits.splice(index, 1);
				this.marketService.decreaseAmplifier(bizUnit.type, bizUnit.sellingType);
			}
		});
	}
}

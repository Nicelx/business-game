import { Injectable } from "@angular/core";
import {
	BusinessUnit,
	PlayerData,
	sellingType,
	traitString,
	unitType,
} from "./../interfaces/game.interfaces";
import { BusinessUnitsService, ProductionNeeds } from "./business-units.service";
import { MarketService } from "./market.service";
import { TraitService } from "./traits.service";

@Injectable({
	providedIn: "root",
})
export class PlayerDataService {
	constructor(
		private marketService: MarketService,
		private businessUnitsService: BusinessUnitsService,
		private traitService: TraitService
	) {}

	playersData: PlayerData[] = [
		{
			playerId: 0,
			playerName: "player",
			money: 4000,
			businessUnits: [],
			playerIncomePerTick: 0,
			traits: this.traitService.getTraits(),
		},
	];
	moneyChanges: number = 0;

	getPlayer(playerId: number) {
		const player = this.playersData.find((item) => item.playerId === playerId);
		if (!player) throw new Error("Player doesnt exist");
		return player;
	}

	public getMainPlayer() {
		return this.playersData[0];
	}

	updatePlayerMoney() {
		this.playersData.forEach((player) => {
			let moneyChange = 0;
			player.businessUnits.forEach((bizUnit, index) => {
				const incomeObj = this.businessUnitsService.calculateIncome(bizUnit);
				if (!incomeObj) return;
				let { income, expense, revenue } = incomeObj;

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

	private _isEnoughMoneyToBuild(type: unitType[], playerId: number) {
		let overallCost = 0;
		type.forEach((singleType) => {
			// let typeCost = this.businessUnitsService.getBuildingCost(singleType);
			let typeCost = BusinessUnitsService.getBuildingCost(singleType);
			if (typeCost) overallCost += typeCost;
		});
		if (overallCost > this.playersData[playerId].money) {
			return false;
		}
		this.playersData[playerId].money -= overallCost;
		return true;
	}

	private _handleNeedsAmplifiers(needs: ProductionNeeds[]) {
		if (!needs) throw new Error("no needs");

		needs.forEach((need) => {
			this.marketService.changeAmplifier(need.type, "market", need.amplifierEffect);
		});
	}

	private _handleAmplifiers(options: {
		type: unitType[];
		sellingType: sellingType;
		case?: string;
	}) {
		const { type, sellingType } = options;

		if (sellingType === "retail") {
			type.forEach((singleUnitType: unitType) => {
				this.marketService.changeAmplifier(singleUnitType, sellingType, -1);

				let needs = this.businessUnitsService.getRetailNeeds(singleUnitType);
				this._handleNeedsAmplifiers(needs);
			});

			return;
		}

		if (sellingType === "market") {
			this.marketService.changeAmplifier(type[0], sellingType, -1);

			let needs = this.businessUnitsService.getprodNeeds(type[0]);
			this._handleNeedsAmplifiers(needs);
		}
	}

	public addBusinessUnit(unit: BusinessUnit, playerId: number): boolean {
		const { type, sellingType } = unit;

		if (!this._isEnoughMoneyToBuild(type, playerId)) {
			console.log("not enough money");
			return false;
		}

		this.playersData[playerId].businessUnits.push(unit);

		this._handleAmplifiers({ type, sellingType });

		return true;
	}

	public deleteBusinessUnit(unitId: number) {
		this.playersData[0].businessUnits.forEach((bizUnit, index) => {
			if (bizUnit.unitId === unitId) {
				this.playersData[0].businessUnits.splice(index, 1);

				let amount = bizUnit.amount;

				if (bizUnit.sellingType === "market") {
					if (Array.isArray(bizUnit.type)) return;
					this.marketService.decreaseAmplifier(bizUnit.type, bizUnit.sellingType, amount);
				}

				if (bizUnit.sellingType === "retail") {
					if (!Array.isArray(bizUnit.type)) return;
					bizUnit.type.forEach((type) => {
						this.marketService.decreaseAmplifier(type, "retail");
					});
				}
			}
		});
	}

	public expandBusinessUnit(bizUnit: BusinessUnit, playerId: number) {
		const { unitId, type, sellingType } = bizUnit;

		if (bizUnit.unitId === undefined) throw new Error("unitId is undifined");

		if (!this._isEnoughMoneyToBuild(type, playerId)) return false;

		this._handleAmplifiers({ type, sellingType });

		bizUnit.amount++;

		return true;
	}

	public buyTrait(trait: traitString, playerId: number, level?: number) {
		let player = this.getPlayer(playerId);
		let isPossibleObj = this.traitService.isPossibleToBuy({
			traitString: trait,
			level: level ? level : 1,
			playerMoney: player.money,
		});
		if (isPossibleObj.isPossible) {
			player.money -= isPossibleObj.cost;

			if (level && level > 1) {
				this.traitService.upgradeTrait(trait);
				return true;
			}
			this.traitService.addTrait({
				name: trait,
				level: 1,
			});
			console.log("bought for ", isPossibleObj.cost);
			return true;
		} else return false;
	}
}

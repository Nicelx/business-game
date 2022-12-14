import { BusinessUnit, unitType } from "../interfaces/game.interfaces";
import { MarketService } from "./market.service";
import { Injectable } from "@angular/core";

const values = {
	apples: {
		incomeCoefficient: 2,
		expenseCoefficient: 2,
		buildingCost: 100,
		amplifierWeight : 1000
	},
	rent: {
		incomeCoefficient: 2,
		expenseCoefficient: 0.8,
		buildingCost: 300,
		amplifierWeight : 900
	},
	iron: {
		incomeCoefficient: 10,
		expenseCoefficient: 10,
		buildingCost: 250,
		amplifierWeight : 1200
	},
	salary: {
		incomeCoefficient: 0,
		expenseCoefficient: 0,
		buildingCost: 0,
		amplifierWeight : 0
	}
};

@Injectable()
export class BusinessUnitsService {
	constructor(private marketService: MarketService) {}

	public calculateIncome(unit: BusinessUnit) {
		// prior calculation. must be flexible and simple formula. i want it operate with parameters and constant only!!!
		let sellingPrice: number = 1;
		let incomeModifier = 1; // traits, bonuses
		let expenseModifier = 1; // traits, bonuses
		let incomeCoefficient = 1; // determine unit type difference of gross production
		let expenseCoefficient = 1;
		let supplyPrice = 1 * 1 * 1; // sum of different supply values;
		//

		let prices = this.marketService.getPrices();

		const { sellingType, type } = unit;

		const findedMarketPiece = prices.find((marketPiece) => {
			return marketPiece.name === unit.type;
		});

		if (!findedMarketPiece) return

		if (sellingType === "market") {
				sellingPrice = findedMarketPiece.price;
				supplyPrice = findedMarketPiece.productionPrice || 1;
		}

		if (sellingType === "retail") { 
			sellingPrice =  findedMarketPiece.retailPrice || 1;
			supplyPrice = findedMarketPiece.price || 1;
		}

		let income = sellingPrice * incomeModifier * incomeCoefficient;
		let expense = supplyPrice * expenseModifier * expenseCoefficient;

		return income - expense;
	}

	public getBuildingCost(type: unitType) {
		if (!values[type]) return 0;
		return values[type].buildingCost;

	}

	public getAmplifierWeight(type : keyof unitType) {
		// const weight = values[type].amplifierWeight;
		// return weight;
	}
}

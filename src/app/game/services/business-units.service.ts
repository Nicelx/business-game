import { unitType } from "../interfaces/game.interfaces";
import { MarketService } from "./market.service";

const values = {
	'apples': {
		incomeCoefficient : 2,
		expenseCoefficient: 2,
		buildingCost: 100,
	},
	'rent': {
		incomeCoefficient: 2,
		expenseCoefficient: 0.8,
		buildingCost: 300, 
	},
	'iron': {
		incomeCoefficient: 10,
		expenseCoefficient: 10,
		buildingCost: 250,
	}
}

export class BusinessUnitsService {
	constructor(private marketService: MarketService) {

	}


	public calculateIncome(unitType: unitType) {
		// prior calculation. must be flexible and simple formula. i want it operate with parameters and constant only!!!
		let sellingPrice = 1;
		let incomeModifier = 1; // traits, bonuses
		let expenseModifier = 1; // traits, bonuses
		let incomeCoefficient = 1; // determine unit type difference of gross production
		let expenseCoefficient = 1;
		let supplyPrice = 1*1*1; // sum of different supply values;
		//



		let prices = this.marketService.getPrices();
		let retailPrices = this.marketService.getRetailPrices();

		sellingPrice

		let income = sellingPrice*incomeModifier* incomeCoefficient;
		let expense = supplyPrice * expenseModifier * expenseCoefficient



		return income - expense;
	}



	public buildUnit(type: unitType) {
		// if (!values[type]) return;
		// return values[type].buildingCost;
	}
}
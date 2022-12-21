import { unitType } from "../interfaces/game.interfaces";

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

	static calculateIncome() {
		// prior calculation. must be flexible and simple formula. i want it operate with parameters and constant only!!!
		const sellingPrice = 1;
		const incomeModifier = 1; // traits, bonuses
		const expenseModifier = 1; // traits, bonuses
		const incomeCoefficient = 1; // determine unit type difference of gross production
		const expenseCoefficient = 1;
		const supplyPrice = 1*1*1; // sum of different supply values;

		let income = sellingPrice*incomeModifier* incomeCoefficient;
		let expense = supplyPrice * expenseModifier * expenseCoefficient
		return income - expense;
	}



	static buildUnit(type: unitType) {
		if (!values[type]) return;
		return values[type].buildingCost;
	}
}
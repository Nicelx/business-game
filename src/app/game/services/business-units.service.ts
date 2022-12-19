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
}
import { BusinessUnit, sellingType, unitType } from "../interfaces/game.interfaces";
import { MarketService } from "./market.service";
import { Injectable } from "@angular/core";
import { values } from './../../values';

export interface ProductionNeeds {
	type: unitType;
	amount: number;
	amplifierEffect: number;
}

@Injectable()
export class BusinessUnitsService {
	constructor(private marketService: MarketService) {}

	public calculateIncome(unit: BusinessUnit) {
		// prior calculation. must be flexible and simple formula. i want it operate with parameters and constant only!!!
		let sellingPrice: number = 1;
		let incomeModifier = 1; // traits, bonuses
		let expenseModifier = 1; // traits, bonuses
		let incomeCoefficient = unit.amount; // determine unit type difference of gross production
		let expenseCoefficient = unit.amount;
		let supplyPrice = 1 * 1 * 1; // sum of different supply values;
		//

		let prices = this.marketService.getPrices();

		const { sellingType, type } = unit;

		const findedMarketPiece = prices.find((marketPiece) => {
			return marketPiece.name === unit.type;
		});

		if (!findedMarketPiece) return;

		if (sellingType === "market") {
			sellingPrice = findedMarketPiece.price;
			// supplyPrice = findedMarketPiece.productionPrice || 1;
			supplyPrice = this.calculateProduction(unit.type as unitType);
		}

		if (sellingType === "retail") {
			if (!Array.isArray(unit.type)) return;

			unit.type.forEach(singleType => {
				
			})

			sellingPrice = findedMarketPiece.retailPrice || 1;
			supplyPrice = (findedMarketPiece.price || 1) + this.calculateRetailProduction(unit.type);
		}

		let revenue = sellingPrice * incomeModifier * incomeCoefficient;
		let expense = supplyPrice * expenseModifier * expenseCoefficient;
		let income = revenue - expense;

		// return revenue - expense;
		return {
			revenue: revenue,
			expense: expense,
			income: income
		}
	}

	public getBuildingCost(type: unitType) {
		if (!values[type]) return 0;
		return values[type].buildingCost;
	}

	calculateProduction(type: unitType) {
		let sumCalc = 0;
		values[type].production.forEach((prodNeeds) => {
			let p = this.marketService.getSinglePrice(prodNeeds.type)!;
			if (p) {
				sumCalc += p * prodNeeds.amount;
			}
		});
		return sumCalc;
	}

	calculateRetailProduction(type: unitType) {
		let sumCalc = 0;
		values[type].retail.forEach((prodNeeds) => {
			let p = this.marketService.getSinglePrice(prodNeeds.type)!;
			if (p) {
				sumCalc += p * prodNeeds.amount;
			}
		});
		return sumCalc;
	}

	public getprodNeeds(type: unitType): ProductionNeeds[] {
		return [...values[type].production];
	}
	public getRetailNeeds(type: unitType): ProductionNeeds[] {
		return [...values[type].retail];
	}

	public getProductionValues(type: unitType) {
		return values[type].production;
	}

	static getAmplifierWeight(type: unitType): number {
		if (type === "apples" || type === "rent" || type === "iron" || type === "salary") {
			const weight = values[type].amplifierWeight;
			return weight;
		} else return 1;
	}
}

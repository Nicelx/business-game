import { BusinessUnit, isUnitType, sellingType, unitType } from "../interfaces/game.interfaces";
import { MarketService } from "./market.service";
import { Injectable } from "@angular/core";
import { values } from './../../values';
import { TraitService } from "./traits.service";

export interface ProductionNeeds {
	type: unitType;
	amount: number;
	amplifierEffect: number;
}

@Injectable()
export class BusinessUnitsService {
	constructor(private marketService: MarketService, private traitService: TraitService) {}

	public calculateIncome(unit: BusinessUnit) {
		
		// prior calculation. must be flexible and simple formula. i want it operate with parameters and constant only!!!
		let sellingPrice: number = 1;
		let incomeModifier = 1; // traits, bonuses
		let expenseModifier = 1; // traits, bonuses
		let incomeCoefficient = unit.amount; // determine unit type difference of gross production
		let expenseCoefficient = unit.amount;
		let supplyPrice = 1; // sum of different supply values;
		//

		let prices = this.marketService.getPrices();

		const { sellingType, type } = unit;


		if (sellingType === "market") {
			const findedMarketPiece = prices.find((marketPiece) => {
				 return marketPiece.name === unit.type[0];
			});
			if (!findedMarketPiece) throw new Error('findedMarketPiece = false')  
			sellingPrice = findedMarketPiece?.price;
			supplyPrice = this.calculateProduction(unit.type[0] as unitType);
		}
		
		if (sellingType === "retail") {
			if (!Array.isArray(type)) throw new Error('retail type isnt array');
			sellingPrice = 0;
			supplyPrice = 0;

			type.forEach((singleRetailType) => {
				if (!singleRetailType) throw new Error('singleRetailType is false');
				const findedRetailPiece = prices.find((marketPiece) => {
					return marketPiece.name === singleRetailType;
				})
				if (!findedRetailPiece) throw new Error('findedRetailPiece wasnt finded in prices') 
				if (!findedRetailPiece.retailPrice) throw new Error('findedRetailPiece doesnt have retailPrice')
				if (!findedRetailPiece.price) throw new Error('findedRetailPiece doesnt have price')

				sellingPrice += findedRetailPiece.retailPrice;
				supplyPrice += this.calculateRetailProduction(singleRetailType)

			});
		}

		let revenue = sellingPrice * incomeModifier * incomeCoefficient;
		let expense = supplyPrice * expenseModifier * expenseCoefficient;
		let income = revenue - expense;

		
		return {
			revenue: revenue,
			expense: expense,
			income: income
		}
	}

	// multiple types because of retail
	public getBuildingCost(type: unitType | unitType[]) {
		let effect = this.traitService.getCheapBuildingEffect();
		if (Array.isArray(type)) {
			let overallCost = 0;
			type.forEach(singleType => {
				overallCost += values[singleType].buildingCost
			})
			return overallCost - effect/100*overallCost;
		}
		if (!values[type]) return 0;

		return values[type].buildingCost - values[type].buildingCost*effect/100;
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
		if (!isUnitType(type)) throw new Error('not a unit type')

		return values[type].amplifierWeight
	}
}

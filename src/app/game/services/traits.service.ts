import { traitStringArray } from "../interfaces/game.interfaces";
import { unitType, sellingType, traitString } from "../interfaces/game.interfaces";
import { Trait } from './../interfaces/game.interfaces';
import { Injectable } from '@angular/core';



const traitValues = {
	RevenuePlus: {
		cost: [1000, 1000, 1000, 1000, 1000],
		levels: 10,
		effects: [2, 3, 4, 5, 10, 1.4, 1.5, 2, 3, 10],
	},
	ExpensesPlus: {
		cost: [1200],
		levels: 10,
		effects: [],
	},
	IncomePlus: {
		cost: [1300],
		levels: 10,
		effects: [],
	},
};


@Injectable({
	providedIn: "root",
})
export class TraitService {
	constructor() {}

	private traits: Trait[] = [
		{
			level: 1,
			name: "IncomePlus"
		}
	];

	public addTrait(trait: Trait) {
		this.traits.push(trait);
	}

	public getTraits() {
		return this.traits
	}

	public calculateTraitIncome(
		unitType: unitType,
		sellingType: sellingType,
		options?: {}
	): number {
		return 1;
	}

	public calculateTraitExpenses(unitType: unitType, sellingType: sellingType, options?: {}) {}

	public increaseCost() {}

	public checkTrait(traitString: traitString) {
		traitStringArray.find(traitStringInArray => {
			traitStringInArray ==
		})

		this.traits.find((lookedTrait) => {
			if (lookedTrait.name === traitString) return 
		});
	}

	public getTraitCost(traitString: traitString, level: number) {
		if (!traitValues[traitString]) throw new Error('traitString is not exist in traitValues object')
		const cost = traitValues[traitString].cost[level - 1]
		if (!cost) throw new Error('no cost')
		return cost;
	}

	public isPossibleToBuy(playerBank: number, traitString: traitString) {
		console.log('checkTrait', this.checkTrait(traitString))
	}
}

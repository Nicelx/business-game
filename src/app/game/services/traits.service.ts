import { traitStringArray } from "../interfaces/game.interfaces";
import { unitType, sellingType, traitString } from "../interfaces/game.interfaces";
import { Trait } from './../interfaces/game.interfaces';
import { Injectable } from '@angular/core';



const traitValues = {
	RevenuePlus: {
		cost: [100, 200, 300, 500, 600],
		levels: 10,
		effects: [2, 3, 4, 5, 10, 1.4, 1.5, 2, 3, 10],
	},
	ExpensesPlus: {
		cost: [400],
		levels: 10,
		effects: [],
	},
	IncomePlus: {
		cost: [600],
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
		// {
		// 	level: 1,
		// 	name: "IncomePlus"
		// },
		// {
		// 	level: 1,
		// 	name: "RevenuePlus"
		// }
	];

	public addTrait(trait: Trait) {
		this.traits.push(trait);
	}

	public upgradeTrait(traitString: traitString) {
		const finded = this.checkTrait(traitString);
		if (finded) finded.level++;
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

	private getTraitValues(traitString: traitString) {
		if (!traitStringArray.find(traitStringInArray => {
			return traitStringInArray === traitString 
		})) throw new Error('trait doesnt exist at all')

		return traitValues[traitString];
	}

	public checkTrait(traitString: traitString) {
		if (!traitStringArray.find(traitStringInArray => {
			return traitStringInArray === traitString 
		})) throw new Error('trait doesnt exist at all')

		console.log('checkTrait this.traits ',this.traits)
		return this.traits.find((lookedTrait) => {
			console.log(lookedTrait)
			return lookedTrait.name ===traitString;
		});


	}

	// public getTraitCost(traitString: traitString, level: number) {
	// 	if (!traitValues[traitString]) throw new Error('traitString is not exist in traitValues object')
	// 	const cost = traitValues[traitString].cost[level - 1]
	// 	if (!cost) throw new Error('no cost')
	// 	return cost;
	// }

	public isPossibleToBuy(options: {
		traitString: traitString,
		level: number,
		playerMoney: number,
	}) {
		if (!options) throw new Error('no options passed')
		const {traitString, level, playerMoney} = options;
		if (!traitString || !level || !playerMoney) throw new Error('one of the options property is incorect')

		const findedTraitValue = this.getTraitValues(traitString)
		if (findedTraitValue.levels < level) throw new Error('passed level is higher than existed')
		
		if (playerMoney > findedTraitValue.cost[level - 1]) return {isPossible : true, cost : findedTraitValue.cost[level - 1]};
		return {isPossible: false, cost : findedTraitValue.cost[level - 1]};
	}
}

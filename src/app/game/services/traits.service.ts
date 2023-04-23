import { traitStringArray } from "../interfaces/game.interfaces";
import { unitType, sellingType, traitString } from "../interfaces/game.interfaces";
import { Trait } from "./../interfaces/game.interfaces";
import { Injectable } from "@angular/core";

const traitValues = {
	RevenuePlus: {
		cost: [101, 202, 303, 504, 605],
		levels: 5,
		effects: [10, 20, 25, 30, 40],
	},
	ExpensesPlus: {
		cost: [400, 402, 403, 404, 405, ],
		levels: 5,
		effects: [10, 20, 25, 30, 40],
	},
	IncomePlus: {
		cost: [301, 302, 303],
		levels: 3,
		effects: [10, 20, 25],
	},
};

@Injectable({
	providedIn: "root",
})
export class TraitService {
	constructor() {}

	private traits: Trait[] = [];

	public addTrait(trait: Trait) {
		this.traits.push(trait);
	}

	public upgradeTrait(traitString: traitString) {
		const finded = this.checkTrait(traitString);
		if (finded) finded.level++;
	}

	public getTraits() {
		return this.traits;
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
		if (
			!traitStringArray.find((traitStringInArray) => {
				return traitStringInArray === traitString;
			})
		)
			throw new Error("trait doesnt exist at all");

		return traitValues[traitString];
	}

	public checkTrait(traitString: traitString) {
		if (
			!traitStringArray.find((traitStringInArray) => {
				return traitStringInArray === traitString;
			})
		)
			throw new Error("trait doesnt exist at all");

		return this.traits.find((lookedTrait) => {
			return lookedTrait.name === traitString;
		});
	}

	public getTraitCost(traitString: traitString) {
		if (!traitValues[traitString])
			throw new Error("traitString is not exist in traitValues object");

		let lookedTrait = this.checkTrait(traitString);
		let level = 0;
		if (lookedTrait) {
			level = lookedTrait.level;
		}

		const cost = traitValues[traitString].cost[level];
		if (!cost) throw new Error("no cost");
		return cost;
	}

	// public getTraitLevel(traitString: traitString) {
	// 	let findedTrait = this.traits.find(trait => {

	// 	})
	// }

	public isPossibleToBuy(options: {
		traitString: traitString;
		level: number;
		playerMoney: number;
	}) {
		if (!options) throw new Error("no options passed");
		const { traitString, level, playerMoney } = options;
		if (!traitString || !level || !playerMoney)
			throw new Error("one of the options property is incorect");

		const findedTraitValue = this.getTraitValues(traitString);
		if (findedTraitValue.levels < level) throw new Error("passed level is higher than existed");

		if (playerMoney > findedTraitValue.cost[level - 1])
			return { isPossible: true, cost: findedTraitValue.cost[level - 1] };
		return { isPossible: false, cost: findedTraitValue.cost[level - 1] };
	}
}

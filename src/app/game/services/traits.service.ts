import { traitStringArray } from "../interfaces/game.interfaces";
import { unitType, sellingType, traitString } from "../interfaces/game.interfaces";
import { Trait } from "./../interfaces/game.interfaces";
import { Injectable } from "@angular/core";

const traitValues = {
	RevenuePlus: {
		cost: [101, 202, 303, 504, 605],
		levels: 5,
		effects: [10, 20, 25, 30, 40],
		description: 'improve revenue output of all of your units'
	},
	ExpensesPlus: {
		cost: [400, 402, 403, 404, 405, ],
		levels: 5,
		effects: [10, 20, 25, 30, 40],
		description: 'reduce expenses of all of your units'
	},
	IncomePlus: {
		cost: [301, 302, 303],
		levels: 3,
		effects: [10, 20, 25],
		description: 'improve income output of all of your units'
	},
	CheapBuilding : {
		cost: [101, 202, 303],
		levels: 3,
		effects: [25, 50, 100],
		description: 'reduce cost of building'
	}
};

@Injectable({
	providedIn: "root",
})
export class TraitService {
	constructor() {}

	private traits: Trait[] = [];

	public addTrait(trait: traitString) {
		const effect = this.getTraitValues(trait).effects[0];
		const desc = traitValues[trait].description;
		this.traits.push({
			name: trait,
			level: 1,
			effect: effect,
			description: desc? desc : 'no description',
		});
		console.log(this.traits)
	}

	public upgradeTrait(traitString: traitString) {
		const finded = this.checkTrait(traitString);
		if (finded) {
			const effect = this.getTraitValues(traitString).effects[finded.level]

			finded.level++;
			finded.effect = effect
		}
		console.log(this.traits)
	}

	public getTraits() {
		return this.traits;
	}

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

	public checkTrait(traitString: traitString | unitType) {
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

	public getCheapBuildingEffect() {
		let checkedTrait = this.checkTrait("CheapBuilding");
		if (checkedTrait) {
			console.log(checkedTrait?.effect);
			return checkedTrait.effect;
		} else return 0;
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

	static showDescription(traitString: traitString) {
		let desc = traitValues[traitString].description;
		console.log('log showDescription()', traitString, desc)
		if (!desc) return 'description error'
		return desc;
	}
}

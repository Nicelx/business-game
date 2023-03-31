import { unitType, sellingType, traitString } from "../interfaces/game.interfaces";
import { Trait } from './../interfaces/game.interfaces';



const traitValues = {
	RevenuePlus: {
		cost: [1000, 1000, 1000, 1000, 1000],
		levels: 10,
		effects: [2, 3, 4, 5, 10, 1.4, 1.5, 2, 3, 10],
	},
	ExpensesPlus: {
		const: [1000],
		levels: 10,
		effects: [],
	},
	IncomePlus: {
		const: [1000],
		levels: 10,
		effects: [],
	},
};



export class TraitService {
	constructor(traits: Trait[]) {
		this.traits = traits
	}

	private traits: Trait[] = [];

	public addTrait() {}

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
		this.traits.find((lookedTrait) => {
			if (lookedTrait.name === traitString) return;
		});
	}
}

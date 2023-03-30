import { unitType, sellingType } from "../interfaces/game.interfaces";

type traitString = "RevenuePlus" | "ExpensesPlus" | "IncomePlus";
const traitStringArray: traitString[] = ["RevenuePlus", "ExpensesPlus", "IncomePlus"];

const traitValues = {
	RevenuePlus: {
		cost: [1000],
		levels: 10,
		effects: [],
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

interface Trait {
	name: traitString;
	level: number;
}

export class TratService {
	constructor() {}

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

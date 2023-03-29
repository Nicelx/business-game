import { unitType, sellingType } from "../interfaces/game.interfaces"

const traitValues = {
	RetailBuff : {
		cost : 1000,

	}
}

interface Trait  {
	name : string,
	level: number,
}

export class MarketService {
	constructor() {}

	private traits: Trait[] = []

	
	public addTrait() {

	}

	public calculateTraitIncome(unitType: unitType, sellingType: sellingType, options? : {}): number {
		return 1;
	}

	public calculateTraitExpenses(unitType: unitType, sellingType: sellingType, options? : {}) {

	}
	
	public increaseCost() {
	}

}

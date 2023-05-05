export interface PlayerData {
	playerId: number;
	playerName: string;
	money: number;
	businessUnits: BusinessUnit[];
	playerIncomePerTick: number;
	traits: Trait[];
}

export interface BusinessUnit {
	unitId: number;
	amount: number;
	type: unitType[];
	sellingType: sellingType;
	earned: number;
	incomePerTick: number;
	expensePerTick: number;
	revenuePerTick: number;
}

export interface Trait {
	name: traitString;
	level: number;
	effect: number;
	description: string;
}

export type traitString = "RevenuePlus" | "ExpensesPlus" | "IncomePlus" | "CheapBuilding";
export type unitType = "apples" | "iron" | "salary" | "rent" | "juice";
export const traitStringArray: traitString[] = ["RevenuePlus", "ExpensesPlus", "IncomePlus", 'CheapBuilding'];

export const isTraitType = (type: any) => {
	if (type === "RevenuePlus" || type === "ExpensesPlus" || type === "IncomePlus") return true;
	else return false;
};

export const isUnitType = (type: any) => {
	if (
		type === "apples" ||
		type === "rent" ||
		type === "iron" ||
		type === "salary" ||
		type === "juice"
	) {
		return true;
	} else return false;
};

export type sellingType = "retail" | "market";

// export type unitKey = keyof unitType;

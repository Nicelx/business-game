export interface PlayerData {
	playerId: number;
	playerName : string;
	money: number;
	businessUnits: BusinessUnit[];
	playerIncomePerTick: number;
}

export interface BusinessUnit {
	unitId : number;
	amount: number
	type: unitType[];
	sellingType: sellingType;
	earned: number;
	incomePerTick: number;
	expensePerTick: number;
	revenuePerTick: number;
}

export type unitType = "apples" | "iron" | "salary" | "rent" | 'juice'

export type sellingType = "retail" | "market"

// export type unitKey = keyof unitType;
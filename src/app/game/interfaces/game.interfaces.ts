export interface PlayerData {
	playerId: number;
	playerName : string;
	money: number;
	businessUnits: BusinessUnit[];
}

export interface BusinessUnit {
	unitId : number;
	type: unitType;
	sellingType: sellingType;
	earned: number;
	incomePerTick: number;
}

export type unitType = "apples" | "iron" | "salary" | "rent"
export type sellingType = "retail" | "market"

// export interface Market {
// 	apples: number;
// 	iron: number
// }

// export type marketKey = keyof Market;
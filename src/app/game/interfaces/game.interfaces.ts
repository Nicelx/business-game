export interface PlayerData {
	playerId: number;
	playerName : string;
	money: number;
	businessUnits: BusinessUnit[];
}

export interface BusinessUnit {
	unitId : number;
	type: string;
}

export type unitType = "apples" | "iron" | "salary" | "retn"

// export interface Market {
// 	apples: number;
// 	iron: number
// }

// export type marketKey = keyof Market;
export interface PlayerData {
	money: number;
	playerId: number;
	businessUnits: BusinessUnit[];
}

export interface BusinessUnit {
	unitId : number;
	type: string;
}

export interface Market {
	apples: number;
	iron: number
}
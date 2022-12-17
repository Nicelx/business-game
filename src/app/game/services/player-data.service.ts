import { Injectable } from "@angular/core";
import { BusinessUnit, PlayerData } from "./../interfaces/game.interfaces";

@Injectable({
	providedIn: "root",
})
export class PlayerDataService {
	constructor() {}

	playersData: PlayerData[] = [
		{ playerId: 0, playerName: "player", money: 0, businessUnits: [{
			unitId: 0,
			type: 'apples'
		}] },
	];

	addBusinessUnit(unit: BusinessUnit, playerId: number) {
		const player = this.getPlayer(playerId);
		if (!player) return;
		player.businessUnits.push(unit);
	}

	getPlayer(playerId: number) {
		const player = this.playersData.find((item) => item.playerId === playerId);
		if (!player) throw new Error('Player doesnt exist');
		return player;
	}
}

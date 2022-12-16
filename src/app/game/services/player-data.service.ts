import { Injectable } from "@angular/core";
import { BusinessUnit, PlayerData } from "./../interfaces/game.interfaces";

@Injectable({
	providedIn: 'root'
})
export class PlayerDataService {
	constructor(private data: PlayerData|null) {
		data = getPlayer()
	}

	playersData: PlayerData[] = [
		{ playerId: 0, playerName: "player", money: 0, businessUnits: [] },
	];

	addBusinessUnit(unit: BusinessUnit) {
		this.data.businessUnits.push(unit);
	}

	getPlayer(playerId: number) {
		const player = this.playersData.find((item) => item.playerId === playerId);
		if (!player) return;
		return player.money;
	}
}

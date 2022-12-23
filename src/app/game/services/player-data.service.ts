import { Injectable } from "@angular/core";
import { BusinessUnit, PlayerData } from "./../interfaces/game.interfaces";
import { BusinessUnitsService } from "./business-units.service";
import { MarketService } from "./market.service";

@Injectable({
	providedIn: "root",
})
export class PlayerDataService {
	constructor(private marketService: MarketService, private businessUnitsService : BusinessUnitsService) {
		
	}

	playersData: PlayerData[] = [
		{ playerId: 0, playerName: "player", money: 0, businessUnits: [{
			unitId: 0,
			type: 'apples',
			sellingType: 'retail',
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

	updatePlayerMoney() {
		const playerRef = this.playersData[0];
		if (!playerRef) return;
		playerRef.businessUnits.forEach(unit => {
			console.log('income', this.businessUnitsService.calculateIncome(unit))
		})
	}
}

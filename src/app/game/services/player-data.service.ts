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
	moneyChanges : number = 0;
	

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

	public getMainPlayer() {
		return {
			...this.playersData[0]
		}
	}

	updatePlayerMoney() {
		this.playersData.forEach(player => {
			let moneyChange = 0;
			player.businessUnits.forEach(bizUnit => {
				let income = this.businessUnitsService.calculateIncome(bizUnit);
				if (income === undefined) return;
				moneyChange += income;
			})			
			player.money += moneyChange;
		})		
		
	}
}

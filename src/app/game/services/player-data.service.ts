import { BusinessUnit, PlayerData } from './../interfaces/game.interfaces';

export class PlayerDataService {
	constructor(private data: PlayerData) {
		data.money = 0;
		data.playerId = 0;
		data.businessUnits = []
	} 

	addBusinessUnit(unit: BusinessUnit) {
		this.data.businessUnits.push(unit);
	}

	

}
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MarketService } from "../services/market.service";
import { PlayerDataService } from "../services/player-data.service";
import { PlayerData, sellingType, unitType } from "./../interfaces/game.interfaces";
import { BusinessUnitsService } from './../services/business-units.service';

@Component({
	selector: "app-creation-model",
	templateUrl: "./creation-model.component.html",
	styleUrls: ["./creation-model.component.css"],
})
export class CreationModelComponent implements OnInit {
	activePlayer: PlayerData | null = null;
	selectedType: unitType | null = null;
	sellingType: sellingType | null = null;
	buildingCost: number = 0;

	@Output() close: EventEmitter<any> = new EventEmitter();

	constructor(private playerService: PlayerDataService, private marketService: MarketService, private businessUnitService: BusinessUnitsService) {}

	ngOnInit(): void {
		this.selectedType = 'apples';
		this.sellingType = 'retail';
		this.buildingCost = this.businessUnitService.getBuildingCost('apples');
	}

	onModalCancel() {
		this.close.emit(true);
	}

	onCreate() {
		if (!this.sellingType) return;
		if (!this.selectedType) return;
		const id = Math.floor(Math.random() * 1000000);

		this.playerService.addBusinessUnit(
			{
				unitId: id,
				sellingType: this.sellingType,
				type: this.selectedType,
				earned: 0,
				incomePerTick: 0,
				expensePerTick: 0,
				revenuePerTick: 0,
			},
			0, this.selectedType, this.sellingType
		);
		// need outsource it .addBusinessUnit()
		console.log(this.playerService.getMainPlayer())

	}

	onOptionSelected(value: unitType | string) {
		if (!(value === "apples" || value === "iron" || value === "salary" || value === "rent"))
			return
		this.selectedType = value;
		this.buildingCost = this.businessUnitService.getBuildingCost(value);
	}

	onSellingTypeSelection(value: string) {
		if (!(value === 'retail' || value === "market")) return;
		this.sellingType = value;
	}
}

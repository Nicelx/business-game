import { Component, EventEmitter, OnInit, Output, OnChanges } from "@angular/core";
import { MarketService, retailTypes, marketProdTypes } from "../services/market.service";
import { PlayerDataService } from "../services/player-data.service";
import { PlayerData, sellingType, unitType } from "./../interfaces/game.interfaces";
import { BusinessUnitsService } from "./../services/business-units.service";
import { TraitService } from './../services/traits.service';

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
	retailTypes = retailTypes;
	marketProdTypes = marketProdTypes;

	@Output() close: EventEmitter<any> = new EventEmitter();

	constructor(
		private playerService: PlayerDataService,
		private marketService: MarketService,
		private businessUnitService: BusinessUnitsService,
		private traitService: TraitService
	) {}

	isEnoughMoney = true;
	playerMoney = this.playerService.getMainPlayer().money;

	ngOnInit(): void {
	

		this.selectedType = "apples";
		this.sellingType = "retail";
		this.buildingCost = BusinessUnitsService.getBuildingCost("apples") - this.traitService.getCheapBuildingEffect();
		
	}

	ngOnChanges() {
		this.playerMoney = this.playerService.getMainPlayer().money;
	}

	onModalCancel() {
		this.close.emit(true);
	}

	onCreate() {
		if (!this.sellingType) return;
		if (!this.selectedType) return;
		const id = Math.floor(Math.random() * 1000000);

		this.isEnoughMoney = this.playerService.addBusinessUnit(
			{
				unitId: id,
				sellingType: this.sellingType,
				type: [this.selectedType],
				earned: 0,
				amount: 1,
				incomePerTick: 0,
				expensePerTick: 0,
				revenuePerTick: 0,
			},
			0
		);
		console.log(this.selectedType, this.sellingType)
		// need outsource it .addBusinessUnit()
	}

	onOptionSelected(value: unitType | string) {
		if (!(value === "apples" || value === "iron" || value === "salary" || value === "rent"|| value ==='juice'))
			return;
		this.selectedType = value;
		this.buildingCost = BusinessUnitsService.getBuildingCost(value);
	}

	onSellingTypeSelection(value: string) {
		if (!(value === "retail" || value === "market")) return;
		this.sellingType = value;
	}
}

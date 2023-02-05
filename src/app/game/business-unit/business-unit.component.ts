import { Component, Input, OnInit } from "@angular/core";
import { BusinessUnit } from "../interfaces/game.interfaces";
import { PlayerDataService } from './../services/player-data.service';

@Component({
	selector: "app-business-unit",
	templateUrl: "./business-unit.component.html",
	styleUrls: ["./business-unit.component.css"],
})
export class BusinessUnitComponent implements OnInit {
	@Input("bizUnit") businessUnit: BusinessUnit = {
		unitId: 0,
		type: "apples",
		sellingType: "retail",
		earned: 0,
		incomePerTick: 0,
		expensePerTick: 0
	};

	constructor(private playerService: PlayerDataService) {}

	checkEarnedColorClass() {
		if (this.businessUnit.earned > 0) return "business-unit__income--green";
		else return "business-unit__income--red";
	}

	checkIncomeColorClass() {
		if (this.businessUnit.incomePerTick > 0) return "business-unit__income--green";
		else return "business-unit__income--red";
	}

	ngOnInit(): void {}

	deleteUnit() {
		this.playerService.deleteBusinessUnit(this.businessUnit.unitId);
	}
}

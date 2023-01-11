import { Component, Input, OnInit } from "@angular/core";
import { BusinessUnit } from "../interfaces/game.interfaces";

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
	};

	constructor() {}

	checkColorClass() {
		if (this.businessUnit.incomePerTick > 0) return "business-unit__income--red";
		else return "business-unit__income--green";
	}

	ngOnInit(): void {}
}

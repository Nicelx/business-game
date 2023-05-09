import { Component, Input, OnInit } from "@angular/core";
import { BusinessUnit } from "../interfaces/game.interfaces";
import { BusinessUnitsService } from "../services/business-units.service";
import { retailTypes as rt } from "../services/market.service";
import { PlayerDataService } from './../services/player-data.service';
import { TraitService } from "../services/traits.service";

@Component({
	selector: "app-business-unit",
	templateUrl: "./business-unit.component.html",
	styleUrls: ["./business-unit.component.css"],
})
export class BusinessUnitComponent implements OnInit {
	@Input("bizUnit") businessUnit: BusinessUnit = {
		amount: 1,
		unitId: 0,
		type: ["apples"],
		sellingType: "retail",
		earned: 0,
		incomePerTick: 0,
		expensePerTick: 0,
		revenuePerTick: 0
	};
	expandCost = 0;
	isExtendVisible = false;
	isRetail = false;
	selectedTypeToExtend = rt[0];
	retailTypes = rt;

	

	constructor(private playerService: PlayerDataService, private buService: BusinessUnitsService) {
	}
	
	
	
	checkEarnedColorClass() {
		if (this.businessUnit.earned > 0) return "business-unit__income--green";
		else return "business-unit__income--red";
	}
	
	checkIncomeColorClass() {
		if (this.businessUnit.incomePerTick > 0) return "business-unit__income--green";
		else return "business-unit__income--red";
	}
	
	ngOnInit(): void {
		this.expandCost = this.buService.getBuildingCost(this.businessUnit.type);
		if (this.businessUnit.sellingType=== 'retail') {
			this.isRetail = true;
		} ;
	}

	expandCostUpgrade() {
		
	}

	onShowExtendDetails(b:boolean) {
		this.isExtendVisible = b;
	}
	

	filterRetail() {
		let arr = [...rt]

		this.businessUnit.type.forEach(singleRarr => {
			arr = arr.filter(singleArr => singleArr !== singleRarr)
		})

		this.businessUnit.type
	}

	onExtendSelection(selection: any) {
		if (!selection) return;
		this.selectedTypeToExtend = selection;
	}

	onAddType() {
		if (this.selectedTypeToExtend === null) throw new Error('selectedTypeToextend is null')
		if (this.businessUnit.sellingType !== 'retail') throw new Error('wrong unit type')
		this.businessUnit.type.find(singleType => {
			if (singleType === this.selectedTypeToExtend) throw new Error('same type to add to retail unit')
		})
		this.businessUnit.type.push(this.selectedTypeToExtend);
		this.expandCost = this.buService.getBuildingCost(this.businessUnit.type)
	}

	onExpand() {
		this.playerService.expandBusinessUnit(this.businessUnit, 0);
	}

	deleteUnit() {
		this.playerService.deleteBusinessUnit(this.businessUnit.unitId);
	}
}

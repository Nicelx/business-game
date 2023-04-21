import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-trait-management",
	templateUrl: "./trait-management.component.html",
	styleUrls: ["./trait-management.component.css"],
})
export class TraitManagementComponent implements OnInit {
	traits = [];

	constructor() {}

	ngOnInit(): void {}

	onAddTrait() {
		let buyingBool = this.playerService.buyTrait(this.traitSelected, 0, 1);
		if (buyingBool) this.traitCost = this.traitService.getTraitCost(this.traitSelected);

		// to do implement check
		this.isAddCheck = true;
	}
	onImproveTrait() {
		let trait = this.traitService.checkTrait(this.traitSelected);
		if (!trait) return;
		this.playerService.buyTrait(this.traitSelected, 0, trait.level + 1);
		this.traitCost = this.traitService.getTraitCost(this.traitSelected);
	}

	onTraitSelection(value: any) {
		this.traitSelected = value;
		this.traitCost = this.traitService.getTraitCost(this.traitSelected);
		if (this.traitService.checkTrait(this.traitSelected)) {
			this.isAddCheck = true;
		} else {
			this.isAddCheck = false;
		}
	}
}

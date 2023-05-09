import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { PlayerDataService } from "../services/player-data.service";
import { TraitService } from "../services/traits.service";
import { traitStringArray } from "../interfaces/game.interfaces";
import { Trait } from "../interfaces/game.interfaces";

@Component({
	selector: "app-trait-management",
	templateUrl: "./trait-management.component.html",
	styleUrls: ["./trait-management.component.css"],
})
export class TraitManagementComponent implements OnInit {
	traits : Trait[]= [];
	isAddCheck = false;
	traitCost = 0;
	traitSelected = traitStringArray[0]
	availableTraits = traitStringArray;
	description: string = TraitService.showDescription(this.traitSelected);
	
	@Output() close: EventEmitter<any> = new EventEmitter();
	@Output() cheapTraitUpgrade: EventEmitter<any> = new EventEmitter();
	constructor(private playerService: PlayerDataService, private traitService: TraitService) {
		
	}

	ngOnInit(): void {
		this.traits = this.traitService.getTraits();
		this.traitCost = this.traitService.getTraitCost(this.availableTraits[0]);
	}

	onAddTrait() {
		let buyingBool = this.playerService.buyTrait(this.traitSelected, 0, 1);
		if (buyingBool) this.traitCost = this.traitService.getTraitCost(this.traitSelected);

		// to do implement check
		this.isAddCheck = true;
		if (this.traitSelected === "CheapBuilding") {
			this.cheapTraitUpgrade.emit(true);
			console.log('emitting cheap Building upgrade')
		}
	}
	onImproveTrait() {
		let trait = this.traitService.checkTrait(this.traitSelected);
		if (!trait) return;
		this.playerService.buyTrait(this.traitSelected, 0, trait.level + 1);
		this.traitCost = this.traitService.getTraitCost(this.traitSelected);
		if (this.traitSelected === "CheapBuilding") {
			this.cheapTraitUpgrade.emit(true);
			console.log('emitting cheap Building upgrade')
		}
	}

	onTraitSelection(value: any) {
		this.traitSelected = value;
		this.description = TraitService.showDescription(this.traitSelected);
		this.traitCost = this.traitService.getTraitCost(this.traitSelected);
		if (this.traitService.checkTrait(this.traitSelected)) {
			this.isAddCheck = true;
		} else {
			this.isAddCheck = false;
		}
	}

	onModalCancel() {
		this.close.emit(true);
	}
}

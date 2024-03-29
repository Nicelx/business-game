import { Injectable } from "@angular/core";
import { PlayerDataService } from "./player-data.service";
import { BusinessUnit, PlayerData, sellingType } from "../interfaces/game.interfaces";
import { unitType } from "../interfaces/game.interfaces";
import { randomArrayElement } from "src/app/functions";

const BOT_SPEED = 100;

type chooseAction =
	| "buildRetail"
	| "buildProduction"
	| "upgrade"
	| "trait"
	| "none"
	| "extend"
	| "correction";

const variator = {
	generalAi: {
		toChooseArray: [
			"buildRetail",
			"buildProduction",
			"upgrade",
			"upgrade",
			"upgrade",
			"upgrade",
			"trait",
			"none",
			"extend",
			"extend",
			"extend",
			"extend",
		],
		toBuildArray: ["apples", "apples", "juice", "iron"],
		toUpgradeArray: ["apples", "juice", "iron"],
	},
};

@Injectable({
	providedIn: "root",
})
export class BotsService {
	constructor() {
		this.initBotsLogic();
	}

	bots: PlayerData[] = [
		{
			playerId: 1,
			playerName: "bot",
			money: 10000,
			businessUnits: [
				{
					unitId: 1,
					sellingType: "retail",
					type: ["apples"],
					earned: 0,
					amount: 1,
					incomePerTick: 0,
					expensePerTick: 0,
					revenuePerTick: 0,
				},
			],
			playerIncomePerTick: 0,
			traits: [],
		},
	];

	private initBotsLogic() {
		setInterval(this.chooseAction.bind(this), BOT_SPEED);
	}

	private chooseAction() {
		let option = randomArrayElement(variator.generalAi.toChooseArray);

		if (
			option === "buildRetail" ||
			option === "buildProduction" ||
			option === "upgrade" ||
			option === "extend"
		) {
			this.chooseType(option);
		}
		console.log("chooseAction option = ", option);
	}

	chooseType(option: chooseAction) {
		const { toBuildArray, toUpgradeArray } = variator.generalAi;
		let type = randomArrayElement(toBuildArray);
		if (option === "buildProduction") {
			let findedBusinessUnit = this.bots[0].businessUnits.find((businessUnit) => {
				return businessUnit.type[0] === type && businessUnit.sellingType === "market";
			});

			if (findedBusinessUnit) return;

			this.AddBusinessUnit(type as unitType, "market");
		}
		if (option === "buildRetail") {
			let findedBU = this.bots[0].businessUnits.find((businessUnit) => {
				if (businessUnit.sellingType !== "retail") return;
				if (businessUnit.type[0].includes(type)) return true;
				return false;
			});

			if (findedBU) return;

			this.AddBusinessUnit(type, "retail");
		}
		if ("upgrade") {
			let businessUnit = randomArrayElement(this.bots[0].businessUnits);
			businessUnit.amount++;
		}

		if ("extend") {
			let filteredRetail = this.bots[0].businessUnits.filter(
				(unit) => unit.sellingType === "retail"
			);
			let typeDuplicationBool = filteredRetail.some((unit) => unit.type.includes(type));
			if (typeDuplicationBool) return;
			let retailUnit = randomArrayElement(filteredRetail);

			retailUnit.type.push(type);
		}
	}

	private chooseTrait() {}

	private AddBusinessUnit(type: unitType, sellingType: sellingType) {
		this.bots[0].businessUnits.push({
			amount: 1,
			earned: 0,
			expensePerTick: 0,
			incomePerTick: 0,
			revenuePerTick: 0,
			sellingType: sellingType,
			unitId: Math.floor(Math.random() * 100000),
			type: [type],
		});
		this.bots[0].businessUnits.sort();
	}

	public getBots() {
		return this.bots;
	}
}

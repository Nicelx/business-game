import { unitType } from "./game/interfaces/game.interfaces";

export const values = {
	apples: {
		incomeCoefficient: 2,
		expenseCoefficient: 2,
		buildingCost: 25,
		amplifierWeight: 1000,
		production: [
			{
				type: "salary" as unitType,
				amount: 1,
				amplifierEffect: 1,
			},
			{
				type: "rent" as unitType,
				amount: 1,
				amplifierEffect: 1,
			},
		],
		retail: [
			{
				type: "salary" as unitType,
				amount: 0.3,
				amplifierEffect: 0.3,
			},
			{
				type: "rent" as unitType,
				amount: 0.3,
				amplifierEffect: 0.3,
			},
			{
				type: "apples" as unitType,
				amount: 1,
				amplifierEffect: 1,
			},
		],
	},
	juice: {
		incomeCoefficient: 2,
		expenseCoefficient: 1,
		buildingCost: 75,
		amplifierWeight: 10000,
		production: [
			{
				type: "salary" as unitType,
				amount: 1,
				amplifierEffect: 1,
			},
			{
				type: "rent" as unitType,
				amount: 1,
				amplifierEffect: 1,
			},
			{
				type: "apples" as unitType,
				amount: 1,
				amplifierEffect: 1,
			},
		],
		retail: [
			{
				type: "salary" as unitType,
				amount: 0.3,
				amplifierEffect: 0.3,
			},
			{
				type: "rent" as unitType,
				amount: 0.3,
				amplifierEffect: 0.3,
			},
			{
				type: "juice" as unitType,
				amount: 1,
				amplifierEffect: 1,
			},
		],
	},
	rent: {
		incomeCoefficient: 2,
		expenseCoefficient: 0.8,
		buildingCost: 300,
		amplifierWeight: 15000,
		production: [],
		retail: [],
	},
	iron: {
		incomeCoefficient: 10,
		expenseCoefficient: 10,
		buildingCost: 150,
		amplifierWeight: 1200,
		production: [
			{
				type: "salary" as unitType,
				amount: 7,
				amplifierEffect: 1,
			},
			{
				type: "rent" as unitType,
				amount: 7,
				amplifierEffect: 1,
			},
		],
		retail: [],
	},
	salary: {
		incomeCoefficient: 0,
		expenseCoefficient: 0,
		buildingCost: 0,
		amplifierWeight: 10000,
		production: [],
		retail: [],
	},
};

import { unitType } from "../interfaces/game.interfaces";
import { BusinessUnitsService } from "./business-units.service";
import { Injectable } from '@angular/core';

export interface RetailPiece {
	name: unitType;
	retailPrice: number;
	retailAmplifier: number;
}

export interface ProdPiece {
	name: unitType;
}

export interface MarketPiece {
	name: unitType;
	price: number;
	amplifier: number;
	productionPrice?: number;
	retailPrice?: number;
	retailAmplifier?: number;
}


export class MarketService {
	constructor() {}

	private market: MarketPiece[] = [
		{ name: "salary", price: 1, amplifier: 0 },
		{ name: "rent", price: 1, amplifier: 0 },
		{
			name: "apples",
			price: 3,
			amplifier: 0,
			productionPrice: 1,
			retailAmplifier: 0,
			retailPrice: 5,
		},
		{ name: "iron", price: 20, amplifier: 0, productionPrice: 5 },
	];

	public getPrices() {
		return [...this.market];
	}

	public getSinglePrice(type: unitType) {
		let findedPiece = this.market.find((piece) => piece.name === type);
		if (!findedPiece) return;
		return findedPiece.price;
	}

	public getRetailPricesOnly() {
		let retailPieces = [];
		retailPieces = this.market.filter((marketPiece) => {
			return marketPiece.retailPrice;
		});
		return retailPieces;
	}

	updateMarket() {
		if (this.market == undefined) {
			console.log("market = undefined");
			return;
		}
		this.market.forEach((marketPiece: MarketPiece, index) => {
			if (marketPiece.amplifier == undefined) return;
			this.market[index].price = Number(
				(
					this.market[index].price +
					marketPiece.price * (marketPiece.amplifier / 100)
				).toFixed(2)
			);
			this.market[index].amplifier = this.fadeAmplifier(marketPiece.amplifier);
			// retail
			if (marketPiece.retailPrice && marketPiece.retailAmplifier) {
				this.market[index].retailAmplifier = this.fadeAmplifier(
					marketPiece.retailAmplifier
				);
				this.market[index].retailPrice =
					marketPiece.retailPrice +
					marketPiece.retailPrice * (marketPiece.retailAmplifier / 100);
				this.prosperMarket(this.market[index]);
			}
		});
	}

	fadeAmplifier(amplifier: number) {
		return amplifier * 0.99;
	}

	// gradually increasing retail price aka inflation.
	prosperMarket(piece: MarketPiece) {
		if (!piece.retailAmplifier || !piece.retailPrice) return;
		if (piece.retailAmplifier >= 0) {
			piece.retailPrice += piece.retailPrice * 0.003;
		}
	}

	public changeAmplifier(type: unitType, sellingType: string, amount: number) {
		let marketPiece = this.market.find((element) => element.name === type);
		if (!marketPiece) return;

		if (sellingType === "retail") {
			if (marketPiece.retailAmplifier !== undefined) marketPiece.retailAmplifier += amount;
		}

		if (sellingType === 'market') {
			marketPiece.amplifier +=amount;
		}
	}

	public decreaseAmplifier(type: string, sellingType: string) {
		let marketPiece = this.market.find((element) => element.name === type);
		if (!marketPiece) return;

		marketPiece.amplifier = -0.6;
		if (sellingType === "retail") {
			marketPiece.retailAmplifier = -0.6;
		}
	}
}

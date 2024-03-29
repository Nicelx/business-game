import { IS_DYNAMIC_MARKET } from "src/app/constants";
import { unitType } from "../interfaces/game.interfaces";
import { BusinessUnitsService } from "./business-units.service";

export const retailTypes: unitType[] = ['apples', 'juice', 'iron']
export const marketProdTypes: unitType[] = ['apples', 'juice', 'iron']

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
			price: 2,
			amplifier: 0,
			productionPrice: 1,
			retailAmplifier: 0,
			retailPrice: 5,
		},
		{ name: "iron", price: 20, amplifier: 0, productionPrice: 5, retailPrice: 40, retailAmplifier: 0 },
		{ name: "juice", price: 5, amplifier: 0, productionPrice: 5, retailPrice: 7.2, retailAmplifier: 0 },
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
		if (this.market == undefined) throw new Error('market is undefined');
		this.market.forEach((marketPiece: MarketPiece, index) => {
			if (marketPiece.amplifier == undefined) return;
			let amplifierWeight = BusinessUnitsService.getAmplifierWeight(this.market[index].name);
			this.market[index].price =
				this.market[index].price + marketPiece.price * (marketPiece.amplifier / amplifierWeight);

			this.market[index].amplifier = this.fadeAmplifier(marketPiece.amplifier);
			// retail
			// console.log('update market before retail', marketPiece)
			if ((marketPiece.retailPrice !== undefined) && (marketPiece.retailAmplifier !== undefined)) {
				// console.log('update market after check')
				this.market[index].retailAmplifier = this.fadeAmplifier(
					marketPiece.retailAmplifier
				);
				this.market[index].retailPrice =
					marketPiece.retailPrice +
					marketPiece.retailPrice * (marketPiece.retailAmplifier / amplifierWeight);
				this.prosperMarket(this.market[index]);
			}
		});
		this._correction();
	}

	fadeAmplifier(amplifier: number) {
		if (!IS_DYNAMIC_MARKET) return amplifier;
		return amplifier * 0.99;
	}

	// gradually increasing retail price aka inflation.
	prosperMarket(piece: MarketPiece) {
		if (!IS_DYNAMIC_MARKET) return;

		if (piece.retailAmplifier === undefined || piece.retailPrice=== undefined) return;
		if (piece.retailAmplifier < 0) {
			piece.retailPrice += piece.retailPrice * 0.003;
		} else {
			piece.retailPrice += piece.retailPrice * 0.001;
		}
	}

	// we need balance rent and salary, to stop them infinitely growing.
	_correction() {
		if (!IS_DYNAMIC_MARKET) return;

		this.market[0].price -= this.market[0].price * 0.0008;
		this.market[1].price -= this.market[1].price * 0.0002;
	}

	public changeAmplifier(type: unitType, sellingType: string, amount: number) {
		if (!IS_DYNAMIC_MARKET) return;

		let marketPiece = this.market.find((element) => element.name === type);
		if (!marketPiece) return;

		if (sellingType === "retail") {
			if (marketPiece.retailAmplifier !== undefined) marketPiece.retailAmplifier += amount;
		}

		if (sellingType === "market") {
			marketPiece.amplifier += amount;
		}
	}

	public decreaseAmplifier(type: unitType, sellingType: string, amount? : number) {
		if (!IS_DYNAMIC_MARKET) return;

		if (amount === undefined) amount = 1;
		let marketPiece = this.market.find((element) => element.name === type);
		if (marketPiece === undefined) return;

		marketPiece.amplifier -= -0.6 * amount;
		if (sellingType === "retail") {
			marketPiece.retailAmplifier ? marketPiece.retailAmplifier -= -0.6 * amount : marketPiece.retailAmplifier == 0;
		}
	}
}

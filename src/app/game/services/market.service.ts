import { unitType } from "../interfaces/game.interfaces";

export interface MarketPiece {
	name: unitType;
	price: number;
	amplifier: number;
}

export class MarketService {
	constructor() {}

	private market: MarketPiece[] = [
		{ name: "salary", price: 1, amplifier: 0 },
		{ name: "rent", price: 1, amplifier: 0 },
		{ name: "apples", price: 3, amplifier: 0 },
		{ name: "iron", price: 20, amplifier: 1 },
	];
	private retailMarket: MarketPiece[] = [
		{ name: "apples", price: 5, amplifier: 0 },
		{ name: "iron", price: 20, amplifier: 1 },
	];

	public getPrices() {
		return [...this.market];
	}

	public getRetailPrices() {
		return [...this.retailMarket]
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
		});
	}

	// private updatePrice(marketPiece: MarketPiece): void {

	// 		marketPiece.price = marketPiece.price + Number((marketPiece.price * marketPiece.amplifier) / 100);

	// 	return;
	// }

	public increaseAmplifier(type: string, amount: number) {
		let marketPiece = this.market.find((element) => element.name === type);
		if (!marketPiece) return;
		marketPiece.amplifier = +amount;
	}
}

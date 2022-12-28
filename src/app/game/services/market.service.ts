import { unitType } from "../interfaces/game.interfaces";

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
		{ name: "salary", price: 1, amplifier: 0  },
		{ name: "rent", price: 1, amplifier: 0, },
		{ name: "apples", price: 3, amplifier: 0, productionPrice: 1, retailAmplifier: 0, retailPrice: 5 },
		{ name: "iron", price: 20, amplifier: 0 , productionPrice: 5},
	];

	public getPrices() {
		return [...this.market];
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


	public changeAmplifier(type: string, amount: number) {
		let marketPiece = this.market.find((element) => element.name === type);
		if (!marketPiece) return;
		marketPiece.amplifier = +amount;
	}
}

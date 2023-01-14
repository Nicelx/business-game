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
					marketPiece.retailPrice * (-marketPiece.retailAmplifier / 100);
					console.log('before', this.market[index])
					this.prosperMarket(this.market[index]);
					console.log('after', this.market[index])
			}
		});
	}

	fadeAmplifier(amplifier: number) {
		return amplifier * 0.99;
	}

	// gradually increasing retail price aka inflation.
	prosperMarket(piece: MarketPiece) {
		if (!piece.retailAmplifier || !piece.retailPrice) return;
		if (piece.retailAmplifier > 0) {
			piece.retailPrice += piece.retailPrice * 0.003;
		}
	}

	public changeAmplifier(type: string, amount: number, sellingType: string) {
		let marketPiece = this.market.find((element) => element.name === type);
		if (!marketPiece) return;
		// retail is increasing retailAmpl and decreaseing amplifier
		if (sellingType === "retail") {
			marketPiece.retailAmplifier = +amount;
			marketPiece.amplifier = +amount;
		} else marketPiece.amplifier = +amount;
	}
}

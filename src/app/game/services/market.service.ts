import { Market } from "../interfaces/game.interfaces";

export class MarketService {
	constructor() {
		setTimeout(this.updateMarket, 1000);
	}

	amplifiers = {
		apples: 1,
		iron: 0,
	};
	market: Market = {
		apples: 3,
		iron: 20,
	};

	public getPrices(): Market {
		return {
			...this.market
		}
	}

	updateMarket() {
		for (let type in this.amplifiers) {
			this.updatePrice(this.market[type])
		}
	}

	private updatePrice(amplifierValue: number, price: number, propName: string): void {
		let newPrice: number = 0;
		if (amplifierValue > 0) {
			newPrice = price + Number((price * amplifierValue) / 100);
			this.market[propName] = newPrice;
			return;
		}
		if (amplifierValue < 0) {
			newPrice = price - Number((price * amplifierValue) / 100);
			return newPrice;
		}
		return newPrice;
	}

	public increaseAmplifier(type: string, amount: number) {
		switch (type) {
			case "apples":
				this.amplifiers.apples += amount;
				return;
			case "iron":
				this.amplifiers.iron += amount;
				return;
			default:
				return;
		}
		this.amplifiers;
	}
}

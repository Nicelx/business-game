import { Market } from "../interfaces/game.interfaces";

export class MarketService {
	amplifiers = {
		apples: 0,
		iron: 0,
	};
	market = {
		apples: 3,
		iron: 20,
	};

	public getPrices(): Market {
		return {
			...this.market
		}
	}

	updateMarket(amplifier: { apples: number; iron: number }) {
		for (let type in amplifier) {
			console.log(type);
		}
	}

	private updatePrice(amplifierValue: number, price: number): number {
		let newPrice: number = 0;
		if (amplifierValue > 0) {
			newPrice = price + Number((price * amplifierValue) / 100);
			return newPrice;
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

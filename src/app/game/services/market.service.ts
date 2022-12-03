export class MarketService {
	market = {
		apples: 3,
		iron: 20,
	};

	updateMarket(amplifier: { apples: number; iron: number }) {
		for (let type in amplifier) {
			if 
		}
	}

	updatePrice(amplifierValue: number, price: number) {
		if (amplifierValue == 0) return price;
		if (amplifierValue > 0) {
			return price *= amplifierValue/100; 
		}
	}
}

import { Component, OnInit } from '@angular/core';
import { Market } from './../interfaces/game.interfaces';
import { MarketService } from './../services/market.service';

@Component({
  selector: 'app-price-info',
  templateUrl: './price-info.component.html',
  styleUrls: ['./price-info.component.css']
})
export class PriceInfoComponent implements OnInit {
  market: Market  = {
    apples: 0,
    iron: 0
  }

  constructor(private marketService: MarketService) { }

  ngOnInit(): void {
    this.market = this.marketService.getPrices();
  }

  updateMarket() {
    this.marketService.updateMarket();
  }

}

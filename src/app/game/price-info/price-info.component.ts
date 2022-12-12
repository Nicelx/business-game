import { Component, OnInit } from '@angular/core';
import { MarketPiece, MarketService } from './../services/market.service';

@Component({
  selector: 'app-price-info',
  templateUrl: './price-info.component.html',
  styleUrls: ['./price-info.component.css']
})
export class PriceInfoComponent implements OnInit {
  market:MarketPiece[]|null  = null

  constructor(private marketService: MarketService) { }

  ngOnInit(): void {
    this.market = this.marketService.getPrices();
  }

  updateMarket() {
    this.marketService.updateMarket();
  }

}

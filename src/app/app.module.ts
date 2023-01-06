import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameComponent } from './game/game.component';
import { BusinessUnitComponent } from './game/business-unit/business-unit.component';
import { MarketService } from './game/services/market.service';
import { PriceInfoComponent } from './game/price-info/price-info.component';
import { GameHeaderComponent } from './game/game-header/game-header.component';
import { PlayerDataService } from './game/services/player-data.service';
import { BusinessUnitsService } from './game/services/business-units.service';
import { CreationModelComponent } from './game/creation-model/creation-model.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LobbyComponent,
    GameComponent,
    BusinessUnitComponent,
    PriceInfoComponent,
    GameHeaderComponent,
    CreationModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [MarketService,PlayerDataService, BusinessUnitsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from "@angular/core";
import { PlayerData } from "../interfaces/game.interfaces";
import { PlayerDataService } from "../services/player-data.service";

@Component({
	selector: "app-game-header",
	templateUrl: "./game-header.component.html",
	styleUrls: ["./game-header.component.css"],
})
export class GameHeaderComponent implements OnInit {
	player: PlayerData | null = null;

	constructor(private playerService: PlayerDataService) {
		setInterval(() => {
			this.playerService.updatePlayerMoney();
			this.player = playerService.getMainPlayer();
		}, 1000);
	}

	ngOnInit(): void {
		this.player = this.playerService.getPlayer(0);
	}
}

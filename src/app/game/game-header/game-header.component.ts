import { Component, OnInit } from "@angular/core";
import { GAME_SPEED } from "src/app/constants";
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
		}, GAME_SPEED);
	}

	ngOnInit(): void {
		this.player = this.playerService.getPlayer(0);
	}
}

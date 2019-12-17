import { Hand } from "./Hand";
import { Player } from "./Player";

class Round {

    private players: Player[] = [];

    constructor(players: Map<string, string>, communityCards: string) {
        players.forEach((cards, name) => {
            const h = new Hand(cards + " " + communityCards);
            this.players.push(new Player(h, name));
        });
    }

    get OrderedPlayers() {
        const result = this.players.sort((p1, p2) => {
            const diff = p2.hand.BestFiveCards[0][0] - p1.hand.BestFiveCards[0][0];
            if (diff !== 0) {
                return diff;
            }
            return diff;
        });

        // tslint:disable-next-line:no-console
        console.log(result);

        return result;

    }

}

export { Round };

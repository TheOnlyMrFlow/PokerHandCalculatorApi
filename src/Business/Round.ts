import { Hand } from "./Hand";
import { Player } from "./Player";

class Round {

    private players: Player[] = [];

    constructor(players: Map<string, string>, communityCards: string) {
        players.forEach((cards, name) => {

            const h = new Hand((cards + " " + communityCards).trim());
            this.players.push(new Player(h, name));
        });
    }

    get OrderedPlayers() {
        const result = this.players.sort((p1, p2) => {
            const combinationsCountP1 = p1.hand.BestFiveCards.length;
            const combinationsCountP2 = p1.hand.BestFiveCards.length;
            const minCombinationsCount = Math.min(combinationsCountP1, combinationsCountP2);
            for (let i = 0; i < minCombinationsCount; i++) {
                const diff = p2.hand.BestFiveCards[i][0] - p1.hand.BestFiveCards[i][0];
                if (diff !== 0) {
                    return diff;
                }
            }
            return 0;
        });

        // tslint:disable-next-line:no-console
        console.log(result);

        return result;

    }

}

export { Round };

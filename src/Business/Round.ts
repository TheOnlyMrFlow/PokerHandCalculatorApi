import { Card } from "./Card";
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
            // tslint:disable-next-line:no-console
            console.log(minCombinationsCount);
            for (let i = 0; i < minCombinationsCount; i++) {
                const diff = p2.hand.BestFiveCards[i][0] - p1.hand.BestFiveCards[i][0];
                // tslint:disable-next-line:no-console
                console.log(p1.hand.BestFiveCards[i][0]);
                // tslint:disable-next-line:no-console
                console.log(p2.hand.BestFiveCards[i][0]);
                if (diff !== 0) {
                    return diff;
                }

                const combP1: Card[] = Object.assign([], p1.hand.BestFiveCards[i][1].length);
                const combP2: Card[] = Object.assign([], p2.hand.BestFiveCards[i][1].length);
                const length = combP1.length;
                const combP1Values: number[] = combP1.map(c => c.ValueOfFace);
                const combP2Values: number[] = combP2.map(c => c.ValueOfFace);
                combP1Values.sort((one, two) => (one > two ? -1 : 1));
                combP2Values.sort((one, two) => (one > two ? -1 : 1));
                for (let j = 0; j < length; j++) {
                    const diffCard = combP2Values[j] - combP1Values[j];
                    if (diffCard !== 0) {
                        return diff;
                    }
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

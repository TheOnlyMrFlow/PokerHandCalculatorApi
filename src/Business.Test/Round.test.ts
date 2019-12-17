import { expect } from "chai";
import "mocha";

import { Round } from "../Business/Round";

describe("Ordering player", () => {
  it("should return players in the right order", () => {
    const players = new Map<string, string>();
    players.set("Michel", "AS 8D");
    players.set("Robert", "TS QS");
    players.set("Edgard", "3H 4H");

    const comCards = "AD 2C 6H TC 5D 9S";

    const round = new Round(players, comCards);

    const ordered = round.OrderedPlayers;

    let last = 0;
    ordered.forEach(p => {
      const current = p.hand.BestFiveCards[0][0];
      expect(current).to.be.gte(last);
      last = current;

    });

  });
});

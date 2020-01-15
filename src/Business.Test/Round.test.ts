import { expect } from "chai";
import "mocha";

import { Round } from "../Business/Round";

describe("Ordering player", () => {
  it("should return players in the right order", () => {
    const players = new Map<string, string>();
    players.set("Michel", "AS 8D"); // AS AD 8D 2C 6H TC 5D
    players.set("Robert", "AH QS"); // AH AD TC QS 2C 6H 5D
    players.set("Edgard", "3H 4H"); // AD 2C 3H 4H 5D 6H TC

    const comCards = "AD 2C 6H TC 5D";

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

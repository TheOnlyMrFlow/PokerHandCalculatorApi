import { expect } from "chai";
import "mocha";
import { Card, CardFace, CardSuit } from "../Business/Card";

describe("Input parsed to card", () => {
  it("should return card matching input", () => {
    const card = new Card("AH");
    expect(card.Face).to.equal(CardFace.Ace);
    expect(card.Suit).to.equal(CardSuit.Hearts);
  });

  it("should throw error if input is not 2 characters long", () => {
    expect(() => {
      return new Card("AHH");
    }).to.throw();
    expect(() => {
      return new Card("A");
    }).to.throw();
  });

  it("should throw error if input has incorrect face", () => {
    expect(() => {
      return new Card("FH");
    }).to.throw();
  });

  it("should throw error if input has incorrect suit", () => {
    expect(() => {
      return new Card("AF");
    }).to.throw();
  });
});

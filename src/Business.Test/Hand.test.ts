import { expect } from "chai";
import "mocha";
import { Card, CardFace, CardSuit } from "../Business/Card";
import { Combination, Hand } from "../Business/Hand";

describe("Building a hand", () => {
  it("should return hand made of appropriate cards", () => {
    const hand = new Hand("KC 9S KS KD 9D 3C 6D");
    expect(hand.Cards[0].Face).to.equal(CardFace.King);
    expect(hand.Cards[0].Suit).to.equal(CardSuit.Clubs);
    expect(hand.Cards[1].Face).to.equal(CardFace.Nine);
    expect(hand.Cards[1].Suit).to.equal(CardSuit.Spades);
    expect(hand.Cards[2].Face).to.equal(CardFace.King);
    expect(hand.Cards[2].Suit).to.equal(CardSuit.Spades);
    expect(hand.Cards[3].Face).to.equal(CardFace.King);
    expect(hand.Cards[3].Suit).to.equal(CardSuit.Diamonds);
    expect(hand.Cards[4].Face).to.equal(CardFace.Nine);
    expect(hand.Cards[4].Suit).to.equal(CardSuit.Diamonds);
    expect(hand.Cards[5].Face).to.equal(CardFace.Three);
    expect(hand.Cards[5].Suit).to.equal(CardSuit.Clubs);
    expect(hand.Cards[6].Face).to.equal(CardFace.Six);
    expect(hand.Cards[6].Suit).to.equal(CardSuit.Diamonds);
  });
});

describe("Getting best five", () => {

  it("should find pair", () => {
    const hand = new Hand("3D TS 6S 5D 3C 8H 7S");
    const bestFive = hand.BestFiveCards;
    expect(bestFive[0][0]).equal(Combination.Pair);
    expect(bestFive[1][0]).equal(Combination.HighCard);
    expect(bestFive[1][1][0].toString()).to.equal("TS");
  });

  it("should find two pairs", () => {
    const hand = new Hand("3D 6S 4S 7D 3C 7H 8S");
    expect(hand.BestFiveCards[0][0]).equal(Combination.TwoPairs);
  });

  it("should find three of a kind", () => {
    const hand = new Hand("3D 3S 6S 5D 3C 7H 8S");
    expect(hand.BestFiveCards[0][0]).equal(Combination.ThreeOfAKind);
  });

  it("should find fullHouse", () => {
    const hand = new Hand("3D 3S 6S 5D 3C 7H 5S");
    expect(hand.BestFiveCards[0][0]).equal(Combination.FullHouse);
  });

  it("should find fourOfAkind", () => {
    const hand = new Hand("3D 3S 6S KD 3C 3H 9S");
    expect(hand.BestFiveCards[0][0]).equal(Combination.FourOfAkind);
  });

  it("should find straight", () => {
    const hand = new Hand("QD JS 6S KD TD 5H 9S");
    expect(hand.BestFiveCards[0][0]).equal(Combination.Straight);
  });

  it("should find straight but with ace as one", () => {
    const hand = new Hand("AD JS 4S 2D 3D 5H 9S");
    expect(hand.BestFiveCards[0][0]).equal(Combination.Straight);
  });

  it("should find flush", () => {
    const hand = new Hand("QD 7D 6S 2D 5D AD 6H");
    expect(hand.BestFiveCards[0][0]).equal(Combination.Flush);
  });

  it("should find straight flush", () => {
    const hand = new Hand("QD JD 6S KD TD 9D 6H");
    expect(hand.BestFiveCards[0][0]).equal(Combination.StraightFlush);
  });

  it("should find straight flush but with ace as one", () => {
    const hand = new Hand("AD JS 4D 2D 3D 5D 9S");
    expect(hand.BestFiveCards[0][0]).equal(Combination.StraightFlush);
  });

  it("should find royal flush", () => {
    const hand = new Hand("QD JD 6S KD TD AD 6H");
    expect(hand.BestFiveCards[0][0]).equal(Combination.RoyalFlush);
  });

  it("should find high card", () => {
    const hand = new Hand("QD JC");
    expect(hand.BestFiveCards[0][0]).equal(Combination.HighCard);
  });

});


import { from, groupBy } from "linq-to-typescript";
import { Card, CardFace, CardSuit } from "./Card";

enum Combination {
  HighCard = 1,
  Pair = 2,
  TwoPairs = 3,
  ThreeOfAKind = 4,
  Straight = 5,
  Flush = 6,
  FullHouse = 7,
  FourOfAkind = 8,
  StraightFlush = 9,
  RoyalFlush = 10
}

class Hand {

  private cards: Card[];

  get Cards() {
    return this.cards;
  }

  get BestFiveCards(): Array<[Combination, Card[]]> {

    const result = new Array<[Combination, Card[]]>();
    let usedCards = new Set<Card>();

    const straights = this.FindStraights();
    const flushes = this.FindFlushes();
    const straightFlushes: Array<Set<Card>> = [];

    if (straights.length !== 0 && flushes.length !== 0) {
      for (const straight of straights) {
        for (const flush of flushes) {
          const isSetsEqual =
            (a: Set<Card>, b: Set<Card>) =>
              a.size === b.size
              &&
              [...a].every(c1 => [...b].filter(c2 => c2.IsEquivalentRegardlessOfValue(c1)));
          if (isSetsEqual(straight, flush)) {
            straightFlushes.push(straight);

          }
        }
      }

      if (straightFlushes.length !== 0) {
        const highestStraightFlush = this.FindHighestOfFlushes(straightFlushes);
        const isRoyal = Array.from(highestStraightFlush).filter(c => c.Face === CardFace.Ace).length !== 0;
        return new Array<[Combination, Card[]]>([
          isRoyal ? Combination.RoyalFlush : Combination.StraightFlush,
          Array.from(highestStraightFlush)
        ]);
      }
    }

    const fourOfAkind = this.FindTuples(4);

    if (fourOfAkind.length !== 0) {
      usedCards = new Set<Card>([...fourOfAkind[0]]);
      result.push([Combination.FourOfAkind, [...fourOfAkind[0]]]);
    } else {
      const triples =
        from(this.FindTuples(3))
          .orderBy(triple => from([...triple]).first().ValueOfFace)
          .toArray();

      const pairs =
        from(this.FindTuples(2))
          .orderBy(pair => from([...pair]).first().ValueOfFace)
          .toArray();

      if (triples.length !== 0 && pairs.length !== 0) {
        // usedCards = new Set<Card>([...triples[0], ...pairs[0]]);
        // result.push([Combination.FullHouse, [...triples[0]].concat([...pairs[0]])]);
        return new Array<[Combination, Card[]]>([
          Combination.FullHouse,
          Array.from([...triples[0]].concat([...pairs[0]]))
        ]);
      }

      if (flushes.length !== 0) {
        const highestFlush = this.FindHighestOfFlushes(flushes);
        return new Array<[Combination, Card[]]>([
          Combination.Flush,
          Array.from(highestFlush)
        ]);
      }

      if (straights.length !== 0) {
        const highestStraight = this.FindHighestOfFlushes(straights);
        return new Array<[Combination, Card[]]>([
          Combination.Straight,
          Array.from(highestStraight)
        ]);
      }

      if (triples.length !== 0) {
        usedCards = new Set<Card>([...triples[0]]);
        result.push([Combination.ThreeOfAKind, [...triples[0]]]);
      }

      if (pairs.length >= 2) {
        usedCards = new Set<Card>([...pairs[0], ...pairs[1]]);
        result.push([Combination.TwoPairs, [...pairs[0]].concat([...pairs[1]])]);
      } else if (pairs.length === 1) {
        usedCards = new Set<Card>([...pairs[0]]);
        result.push([Combination.Pair, [...pairs[0]]]);
      }

    }

    const unusedCardsSet = new Set(
      this.Cards.filter(x => !usedCards.has(x))
    );

    const unusedCards = [...unusedCardsSet].sort((a, b) => b.ValueOfFace - a.ValueOfFace);

    const amountToFill = 7 - usedCards.size;

    for (let i = 0; i < amountToFill; i++) {
      result.push([Combination.HighCard, [unusedCards[i]]]);
    }

    return result;

  }

  constructor(input: string) {
    const splitInput = input.split(" ");
    this.cards = [];
    splitInput.forEach(cardInput => {
      this.cards.push(new Card(cardInput));
    });
  }

  private FindTuples(n: number) {
    const tempCards = new Set<Card>(this.Cards);
    const cardsGrouping = from(this.Cards).groupBy(c => c.Face);
    const pairs =
      cardsGrouping
        .where(grouping => grouping.count() === n)
        .select(grouping => grouping.toSet())
        .toArray();
    return pairs;
  }

  private FindStraights(): Array<Set<Card>> {

    const NUMBER_OF_CARDS_IN_A_STRAIGHT = 5;

    const tempCards: Card[] = Object.assign([], this.cards);
    this.cards.forEach((card) => {
      if (card.Face === CardFace.Ace) {
        const one = new Card("1" + card.Suit.toString());
        tempCards.push(one);
      }
    });

    const faceToCard = new Map<CardFace, Card>();

    tempCards.forEach(card => {
      faceToCard.set(card.Face, card);
    });

    const distinctCards = Array.from(faceToCard.values());

    const reverselySortedUniqueCards =
      distinctCards
        .sort((a, b) => {
          return b.ValueOfFace - a.ValueOfFace;
        });

    if (reverselySortedUniqueCards.length < 5) {
      return [];
    }

    const res = new Array<Set<Card>>();

    const count = reverselySortedUniqueCards.length;
    for (let i = 0; i <= count - NUMBER_OF_CARDS_IN_A_STRAIGHT; i++) {
      if (reverselySortedUniqueCards[i].ValueOfFace - reverselySortedUniqueCards[i + 4].ValueOfFace === 4) {
        res.push(new Set(reverselySortedUniqueCards.slice(i, i + 5)));
      }
    }

    return res;
  }

  private FindFlushes(): Array<Set<Card>> {
    const suitToCount = new Map<CardSuit, number>();
    this.cards.forEach(card => {
      const oldCount = suitToCount.get(card.Suit) || 0;
      suitToCount.set(card.Suit, oldCount + 1);
    });

    const res = new Array<Set<Card>>();

    for (const suit of suitToCount.keys()) {
      if (suitToCount.get(suit) >= 5) {
        res.push(new Set(this.cards.filter(c => c.Suit === suit)));
      }
    }

    return res;
  }

  private FindHighestOfFlushes(flushes: Array<Set<Card>>): Set<Card> {
    let maxFlush;
    let highestFace = 0;
    for (const flush of flushes) {
      const highFace = Math.max(...Array.from(flush).map(c => c.ValueOfFace));
      if (highFace > highestFace) {
        highestFace = highFace;
        maxFlush = flush;
      }
    }
    return maxFlush;
  }

  private FindRoyalFlush(): Card[] {
    const aces = this.cards.filter(c => c.Face === CardFace.Ace);
    const suits = aces.map(a => a.Suit);
    if (aces.length === 0) {
      return undefined;
    }
    const kings = this.cards.filter(
      c => c.Face === CardFace.King && c.Suit in suits
    );
    if (kings.length === 0) {
      return undefined;
    }

    return;
  }
}

export { Hand, Combination };

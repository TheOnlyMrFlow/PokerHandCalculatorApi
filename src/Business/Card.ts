enum CardFace {
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "T",
  Jack = "J",
  Queen = "Q",
  King = "K",
  Ace = "A"
}

enum CardSuit {
  Hearts = "H",
  Spades = "S",
  Clubs = "C",
  Diamonds = "D"
}

class Card {

  get Face(): CardFace {
    return this.face;
  }

  get Suit() {
    return this.suit;
  }

  get ValueOfFace(): number {
    switch (this.face) {
      case CardFace.One:
        return 1;
        break;
      case CardFace.Two:
        return 2;
        break;
      case CardFace.Three:
        return 3;
        break;
      case CardFace.Four:
        return 4;
        break;
      case CardFace.Five:
        return 5;
        break;
      case CardFace.Six:
        return 6;
        break;
      case CardFace.Seven:
        return 7;
        break;
      case CardFace.Eight:
        return 8;
        break;
      case CardFace.Nine:
        return 9;
        break;
      case CardFace.Ten:
        return 10;
        break;
      case CardFace.Jack:
        return 11;
        break;
      case CardFace.Queen:
        return 12;
        break;
      case CardFace.King:
        return 13;
        break;
      case CardFace.Ace:
        return 14;
        break;
      default:
        break;
    }
  }
  private face: CardFace;
  private suit: CardSuit;

  constructor(input: string) {
    if (input.length !== 2) {
      throw new Error("Input for a card must be 2 characters long but got" + input);
    }

    const faceInput: string = ("" + input[0]) as keyof typeof CardFace;
    this.face = this.stringToCardFace(input[0]);
    this.suit = this.stringToCardSuit(input[1]);
  }

  public IsEquivalentRegardlessOfValue(other: Card) {
    if (other.Suit !== this.Suit) {
      return false;
    }

    if (other.Face === this.Face) {
      return true;
    }

    if (other.Face in [CardFace.Ace, CardFace.One] && this.Face in [CardFace.Ace, CardFace.One]) {
      return true;
    }

    return false;
  }

  public toString() {
    return this.Face.toString() + this.Suit.toString();
  }

  private stringToCardFace(face: string) {
    switch (face) {
      case "1":
        return CardFace.One;
      case "2":
        return CardFace.Two;
      case "3":
        return CardFace.Three;
      case "4":
        return CardFace.Four;
      case "5":
        return CardFace.Five;
      case "6":
        return CardFace.Six;
      case "7":
        return CardFace.Seven;
      case "8":
        return CardFace.Eight;
      case "9":
        return CardFace.Nine;
      case "T":
        return CardFace.Ten;
      case "J":
        return CardFace.Jack;
      case "Q":
        return CardFace.Queen;
      case "K":
        return CardFace.King;
      case "A":
        return CardFace.Ace;
      default:
        throw new Error("Unrecognized card face");
    }
  }

  private stringToCardSuit(suit: string) {
    switch (suit) {
      case "H":
        return CardSuit.Hearts;
      case "S":
        return CardSuit.Spades;
      case "C":
        return CardSuit.Clubs;
      case "D":
        return CardSuit.Diamonds;
      default:
        throw new Error("Unrecognized card suit");
    }
  }
}

export { Card, CardFace, CardSuit };

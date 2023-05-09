import { Deck } from "./Deck";
import { Hand } from "./Hand";

export class Player {
  private hand: Hand;

  private hasRoyalFlush: boolean;

  private constructor(private name: string, private score: number) {
    this.hand = Hand.create([]);
    this.hasRoyalFlush = false;
  }

  static create(name: string) {
    return new Player(name, 0);
  }

  dealHand(deck: Deck, cardsAmount: number) {
    for (let i = 0; i < cardsAmount; i++) {
      const card = deck.draw();
      this.hand.add(card);
    }
  }

  cardsAmount() {
    return this.hand.cardsAmount();
  }

  evaluateHand() {
    return this.hand.evaluate();
  }

  getScore() {
    return this.score;
  }

  getName() {
    return this.name;
  }

  increaseScore() {
    ++this.score;
  }

  doublePoints() {
    this.score = this.score * 2;
  }

  setRoyalFlush() {
    this.hasRoyalFlush = true;
  }

  previousMatchRoyalFlush() {
    return this.hasRoyalFlush;
  }
}

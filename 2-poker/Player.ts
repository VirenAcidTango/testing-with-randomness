import { Card } from "./Card";
import { Deck } from "./Deck";

export class Player {
  private hand: Card[];

  private constructor(private name: string, private score: number) {
    this.hand = [];
  }

  static create(name: string) {
    return new Player(name, 0);
  }

  dealHand(deck: Deck, cardsAmount: number) {
    for (let i = 0; i < cardsAmount; i++) {
      const card = deck.draw();
      this.hand.push(card);
    }
  }

  getHand() {
    return this.hand;
  }

  getScore() {
    return this.score;
  }

  getName() {
    return this.name;
  }
}

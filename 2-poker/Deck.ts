import { Card } from "./Card";

export class Deck {
  private constructor(private cards: Card[]) {}

  static create(cards: Card[]) {
    return new Deck(cards);
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(): Card {
    const card = this.cards.pop();
    if (!card) throw new Error("Deck is empty");
    return card;
  }
}

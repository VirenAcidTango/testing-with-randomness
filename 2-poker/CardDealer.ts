import { Card } from "./Card";
import { Deck } from "./Deck";

export class CardDealer {
  static deal(cardsAmount: number, deck: Deck): Card[] {
    const cards = [];
    for (let i = 0; i < cardsAmount; i++) {
      const card = deck.draw();
      if (card) {
        cards.push(card);
      }
    }
    return cards;
  }
}

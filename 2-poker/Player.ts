import { CardDealer } from "./CardDealer";
import { Deck } from "./Deck";
import { Hand } from "./Hand";
import { HandCombination } from "./HandCombination";

export class Player {
  private hand: Hand;

  private previousMatchStraightFlush: boolean;

  private constructor(private name: string, private score: number) {
    this.hand = Hand.create([]);
    this.previousMatchStraightFlush = false;
  }

  static create(name: string) {
    return new Player(name, 0);
  }

  dealHand(deck: Deck, cardsAmount: number) {
    this.hand = Hand.create(CardDealer.deal(cardsAmount, deck));
  }

  cardsAmount() {
    return this.hand.getCardsAmount();
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

  getHand() {
    return this.hand;
  }

  getPreviousMatchStraightFlush() {
    return this.previousMatchStraightFlush;
  }

  setPreviousMatchStraightFlush(straightFlush: boolean) {
    this.previousMatchStraightFlush = straightFlush;
  }

  increaseScore() {
    ++this.score;
  }

  doublePoints() {
    this.score = this.score * 2;
  }
}

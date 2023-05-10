import { Card } from "./Card";
import { HandCombination } from "./HandCombination";
import { Rank } from "./Rank";

export class Hand {
  private constructor(private cards: Card[]) {}

  static create(cards: Card[]) {
    return new Hand(cards);
  }

  add(card: Card) {
    this.cards.push(card);
  }

  getCardsAmount() {
    return this.cards.length;
  }

  getCards() {
    return this.cards;
  }

  evaluate(): HandCombination {
    const sortedCards = this.cards.sort((a, b) => {
      const rankA = Object.values(Rank).indexOf(a.rank);
      const rankB = Object.values(Rank).indexOf(b.rank);
      return rankA - rankB;
    });

    if (this.hasStraightFlush(sortedCards)) {
      return HandCombination.STRAIGHT_FLUSH;
    }

    if (this.hasFourOfAKind(sortedCards)) {
      return HandCombination.FOUR_OF_A_KIND;
    }

    if (this.hasFullHouse(sortedCards)) {
      return HandCombination.FULL_HOUSE;
    }

    if (this.hasFlush(sortedCards)) {
      return HandCombination.FLUSH;
    }

    if (this.hasStraight(sortedCards)) {
      return HandCombination.STRAIGHT;
    }

    if (this.hasThreeOfAKind(sortedCards)) {
      return HandCombination.THREE_OF_A_KIND;
    }

    if (this.hasTwoPairs(sortedCards)) {
      return HandCombination.TWO_PAIR;
    }

    if (this.hasOnePair(sortedCards)) {
      return HandCombination.PAIR;
    }

    return HandCombination.HIGH_CARD;
  }

  private hasStraightFlush(cards: Card[]): boolean {
    return this.hasFlush(cards) && this.hasStraight(cards);
  }

  private hasFourOfAKind(cards: Card[]): boolean {
    const counts = this.countByRank(cards);
    return Object.values(counts).includes(4);
  }

  private hasFullHouse(cards: Card[]): boolean {
    const counts = this.countByRank(cards);
    return (
      Object.values(counts).includes(3) && Object.values(counts).includes(2)
    );
  }

  private hasFlush(cards: Card[]): boolean {
    return cards.every((card, _, array) => card.suit === array[0].suit);
  }

  private hasStraight(cards: Card[]): boolean {
    for (let i = 0; i < cards.length - 1; i++) {
      const rankA = Object.values(Rank).indexOf(cards[i].rank);
      const rankB = Object.values(Rank).indexOf(cards[i + 1].rank);
      if (rankA + 1 !== rankB) {
        return false;
      }
    }
    return true;
  }

  private hasThreeOfAKind(cards: Card[]): boolean {
    const counts = this.countByRank(cards);
    return Object.values(counts).includes(3);
  }

  private hasTwoPairs(cards: Card[]): boolean {
    const counts = this.countByRank(cards);
    return Object.values(counts).filter((count) => count === 2).length === 2;
  }

  private hasOnePair(cards: Card[]): boolean {
    const counts = this.countByRank(cards);
    return Object.values(counts).includes(2);
  }

  private countByRank(cards: Card[]): Record<Rank, number> {
    const counts: Record<Rank, number> = {
      [Rank.ACE]: 0,
      [Rank.TWO]: 0,
      [Rank.THREE]: 0,
      [Rank.FOUR]: 0,
      [Rank.FIVE]: 0,
      [Rank.SIX]: 0,
      [Rank.SEVEN]: 0,
      [Rank.EIGHT]: 0,
      [Rank.NINE]: 0,
      [Rank.TEN]: 0,
      [Rank.JACK]: 0,
      [Rank.QUEEN]: 0,
      [Rank.KING]: 0,
    };

    cards.forEach((card) => {
      counts[card.rank]++;
    });

    return counts;
  }
}

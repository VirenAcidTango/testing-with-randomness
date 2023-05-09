import { Poker } from "./Poker";

describe("Play Poker game", () => {
  it("has two players with 5 cards each", () => {
    const player1 = "Player1";
    const player2 = "Player2";
    const poker = Poker.create([player1, player2], 5);

    const match = poker.play();

    expect(match.players.length).toEqual(2);
    match.players.forEach((player) => expect(player.cardsAmount()).toEqual(5));
  });
});

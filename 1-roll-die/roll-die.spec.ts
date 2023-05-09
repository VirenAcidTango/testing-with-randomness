import { Die } from "./Die";

describe("Roll Die", () => {
  it("rolls a 6 sided die", () => {
    const ITERATIONS = 100;
    const sixSidedDie = new Die(6);

    const rollResult = sixSidedDie.roll();

    expect(rollResult).toBeGreaterThan(0);
    expect(rollResult).toBeLessThanOrEqual(6);
  });

  it("rolls a 6 sided die multiple times", () => {
    const ITERATIONS = 100;
    const sixSidedDie = new Die(6);

    let index = 0;
    while (index < ITERATIONS) {
      const rollResult = sixSidedDie.roll();

      expect(rollResult).toBeGreaterThan(0);
      expect(rollResult).toBeLessThanOrEqual(6);

      ++index;
    }
  });
});

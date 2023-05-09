import { Die } from "./Die";

describe("Roll Die", () => {
  it("rolls a 6 sided die", () => {
    const sixSidedDie = new Die(6);

    const rollResult = sixSidedDie.roll();

    expect(rollResult).toBeGreaterThan(0);
    expect(rollResult).toBeLessThanOrEqual(6);
  });
});

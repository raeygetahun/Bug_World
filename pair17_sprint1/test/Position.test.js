import { Position } from "../scripts/game_logic/Position";

describe("Position", () => {
  test("constructor", () => {
    expect(() => new Position("test", 5)).toThrow("Invalid Position values");
    expect(() => new Position(-2, 5)).toThrow("Invalid Position values");
    expect(() => new Position(-2, 0)).toThrow("Invalid Position values");
    expect(() => new Position("12", "12")).toThrow("Invalid Position values");
  });
});

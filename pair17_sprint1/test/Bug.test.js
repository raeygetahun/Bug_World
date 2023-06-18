import { Bug } from "../scripts/game_logic/Bug";
import { Color } from "../scripts/game_logic/Color";

describe("Bug", () => {
  test("constructor", () => {
    expect(() => new Bug("", Color.Bug1, 2, 10, 2, true, null)).toThrow("Invalid bug id");
    expect(() => new Bug(-1, Color.Bug1, 2, 10, 2, true, null)).toThrow("Invalid bug id");

    expect(() => new Bug(1, "test", 2, 10, 2, true, null)).toThrow("Invalid color");
    expect(() => new Bug(1, Color.Bug1, "2", 10, 2, true, null)).toThrow("Invalid bug state");
    expect(() => new Bug(1, Color.Bug1, -2, 10, 2, true, null)).toThrow("Invalid bug state");

    expect(() => new Bug(1, Color.Bug1, 2, "10", 2, true, null)).toThrow("Invalid bug resting value");
    expect(() => new Bug(1, Color.Bug1, 2, -10, 2, true, null)).toThrow("Invalid bug resting value");

    expect(() => new Bug(1, Color.Bug1, 2, 10, "2", true, null)).toThrow("Invalid bug direction");
    expect(() => new Bug(1, Color.Bug1, 2, 10, -2, true, null)).toThrow("Invalid bug direction");

    expect(() => new Bug(1, Color.Bug1, 2, 10, 2, "true", null)).toThrow("Invalid hasFood value");
    expect(() => new Bug(1, Color.Bug1, 2, 10, 2, "test", null)).toThrow("Invalid hasFood value");

    expect(() => new Bug(1, Color.Bug1, 2, 10, 2, true, "test")).toThrow("Invalid BugBrain");
    expect(() => new Bug(1, Color.Bug1, 2, 10, 2, true, Color.Bug2)).toThrow("Invalid BugBrain");
  });
});

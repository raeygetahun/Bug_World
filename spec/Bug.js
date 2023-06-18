import { Bug } from "../scripts/game_logic/Bug.js";
import { BugBrain } from "../scripts/game_logic/BugBrain.js";
import { Color } from "../scripts/game_logic/Color.js";
import { World } from "../scripts/game_logic/World.js";

describe("Bug", () => {
  let bugOptions;
  let bug;

    bugOptions = {
      id: 1,
      color: Color.Bug1,
      state: 0,
      resting: 0,
      direction: 0,
      hasFood: false,
      brain: null,
      world: null,
      position: { x: 0, y: 0 }
    };
    console.log(bug)
    bug = new Bug(bugOptions);
    console.log("hello")
    console.log(bug)

  it("should create a new Bug instance", () => {
    console.log(bug)
    expect(bug instanceof Bug).toBe(true);
  });

  it("should set the initial properties", () => {
    expect(bug.id).toBe(1);
    expect(bug.color).toBe(Color.Bug1);
    expect(bug.state).toBe(-1);
    expect(bug.resting).toBe(0);
    expect(bug.direction).toBe(0);
    expect(bug.hasFood).toBe(false);
    expect(bug.brain).toBe(null);
    expect(bug.position).toEqual({ x: 0, y: 0 });
  });

  it("should throw an error for invalid inputs", () => {
    bugOptions.id = -1;
    expect(() => new Bug(bugOptions)).toThrowError("Invalid bug id");

    bugOptions.id = 1;
    bugOptions.color = "InvalidColor";
    expect(() => new Bug(bugOptions)).toThrowError("Invalid color");

    bugOptions.color = Color.Bug1;
    bugOptions.state = -1;
    expect(() => new Bug(bugOptions)).toThrowError("Invalid bug state");
  });

  it("should clone the Bug instance", () => {
    const clonedBug = bug.clone();
    //expect(clonedBug).not.toBe(bug);
    expect(clonedBug).toEqual(bug);
  });

  it("should kill the Bug instance", () => {
    bug.kill();
    expect(bug.isDead()).toBe(true);
  });

  it("should update the position of the bug", () => {
    const newPosition = { x: 1, y: 1 };
    bug.position = newPosition;
    expect(bug.position).toEqual(newPosition);
  });

  // You can add more test cases for methods such as `sense`, `flip`, `mark`, `unmark`, `pickUp`, `drop`, `turn`, and `move`.
});


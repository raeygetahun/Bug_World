// import { WorldCell } from "../scripts/game_logic/WorldCell";
// import { Color } from "../scripts/game_logic/Color";
// import { Bug } from "../scripts/game_logic/Bug";
// import { World } from "../scripts/game_logic/World";
// import { Position } from "../scripts/game_logic/Position";

// var world = new World(3, 2);
// world.map = [[
//     new WorldCell(false, 5, Color.Bug2, null, Color.Bug1),
//     new WorldCell(true, 5, Color.Bug2, null, Color.Bug1),
//     new WorldCell(false, 5, Color.Bug2, null, Color.Bug1)],
//     [
//     new WorldCell(false, 5, Color.Bug2, null, Color.Bug2),
//     new WorldCell(false, 5, Color.Bug2, null, Color.Bug2),
//     new WorldCell(false, 5, Color.Bug2, null, Color.Bug2)
//     ]];

// describe("World", () => {
//   test("constructor", () => {
//     expect(() => new World("a", 0)).toThrow("Invalid dimensions");
//     expect(() => new World(1, "b")).toThrow("Invalid dimensions");
//     expect(() => new World(-1, -2)).toThrow("Invalid dimensions");
//     expect(() => new World(-5, 4)).toThrow("Invalid dimensions");
//     expect(() => new World(3, -5)).toThrow("Invalid dimensions");
//   });

//   test("isObstructedAt", () => {
//     expect(world.isObstructedAt(new Position(0, 0))).toBe(false);
//   });

//   test("isOccupiedAt", () => {
//     expect(world.isOccupiedAt(new Position(0, 0))).toBe(false);
//   });

//   test("isFriendlyBaseAt", () => {
//     expect(world.isFriendlyBaseAt(new Position(0, 0), Color.Bug1)).toBe(true);
//     expect(world.isFriendlyBaseAt(new Position(0, 0), Color.Bug2)).toBe(false);
//   });

//   test("isEnemyBaseAt", () => {
//     expect(world.isEnemyBaseAt(new Position(0, 0), Color.Bug1)).toBe(false);
//     expect(world.isEnemyBaseAt(new Position(0, 0), Color.Bug2)).toBe(true);
//   });

//   test("removeBugAt", () => {
//     const pos = new Position(0, 0);
//     expect(world.removeBugAt(pos)).toBe(false);
//     expect(world.getBugAt(pos)).toBe(null);

//     var bug = new Bug(1, Color.Bug1, 2, 10, 2, true, null);
//     world.setBugAt(pos, bug);
//     expect(world.removeBugAt(pos)).toBe(true);
//     expect(world.getBugAt(pos)).toBe(null);
//   });

//   test("getFoodAt", () => {
//     const pos = new Position(0, 0);
//     expect(world.getFoodAt(pos)).toBe(5);
//   });

//   test("getBugAt", () => {
//     expect(world.getBugAt(new Position(0, 0))).toBe(null);
//   });

//   test("setFoodAt", () => {
//     const pos = new Position(0, 0);
//     world.setFoodAt(pos, 6);
//     expect(world.getFoodAt(pos)).toBe(6);
//     world.setFoodAt(pos, 5);
//   });

//   test("setBugAt", () => {
//     const pos = new Position(0, 0);
//     var bug = new Bug(1, Color.Bug1, 2, 10, 2, true, null);

//     expect(world.setBugAt(pos, bug)).toBe(true);
//     expect(world.setBugAt(new Position(1, 0), bug)).toBe(false);

//     world.removeBugAt(pos);
//   });

//   test("getBugAt", () => {
//     const pos = new Position(0, 0);
//     var bug = new Bug(1, Color.Bug1, 2, 10, 2, true, null);
//     world.setBugAt(pos, bug);

//     expect(world.getBugAt(pos)).toMatchObject(bug);
//   });

//   test("isFriendlyMarkerAt", () => {
//     const pos = new Position(0, 0);

//     world.setMarkerAt(pos, Color.Bug1);
//     expect(world.isFriendlyMarkerAt(pos, Color.Bug1)).toBe(true);
//     expect(world.isFriendlyMarkerAt(pos, Color.Bug2)).toBe(false);

//     world.clearMarkerAt(pos, Color.Bug1);
//     expect(world.isFriendlyMarkerAt(pos, Color.Bug1)).toBe(false);
//     expect(world.isFriendlyMarkerAt(pos, Color.Bug1)).toBe(false);
//   });

//   test("isEnemyMarkerAt", () => {
//     const pos = new Position(0, 0);

//     world.setMarkerAt(pos, Color.Bug1);
//     expect(world.isEnemyMarkerAt(pos, Color.Bug1)).toBe(false);
//     expect(world.isEnemyMarkerAt(pos, Color.Bug2)).toBe(true);

//     world.clearMarkerAt(pos, Color.Bug1);
//     expect(world.isEnemyMarkerAt(pos, Color.Bug1)).toBe(false);
//     expect(world.isEnemyMarkerAt(pos, Color.Bug2)).toBe(false);
//   });

//   test("adjacent", () => {
//     const pos = new Position(1, 0);

//     expect(world.adjacent(pos, 0)).toMatchObject(world.cellAt(new Position(2, 0)));
//     expect(world.adjacent(pos, 1)).toMatchObject(world.cellAt(new Position(2, 1)));
//     expect(world.adjacent(pos, 2)).toMatchObject(world.cellAt(new Position(1, 1)));
//     expect(world.adjacent(pos, 3)).toMatchObject(world.cellAt(new Position(0, 0)));
//     expect(world.adjacent(pos, 4)).toBe(null);
//     expect(world.adjacent(pos, 5)).toBe(null);
//   });

// });

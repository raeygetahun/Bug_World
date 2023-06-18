import { WorldCell } from "../scripts/game_logic/WorldCell";
import { Color } from "../scripts/game_logic/Color";
import { Bug } from "../scripts/game_logic/Bug";

var worldCell = new WorldCell(false, 5, Color.Bug2, null, Color.Bug1);
var worldCell_obstructed = new WorldCell(true, 5, Color.Bug2, null, Color.Bug1);

describe("WorldCell", () => {
  test("constructor", () => {
    expect(() => new WorldCell("test", 5, Color.Bug2, null, Color.Bug1)).toThrow("Invalid obstructed value");
    expect(() => new WorldCell(false, " ", Color.Bug2, null, Color.Bug1)).toThrow("Invalid amount");
    expect(() => new WorldCell(false, 5, " ,..", null, Color.Bug1)).toThrow("Invalid marker value");
    expect(() => new WorldCell(false, 5, Color.Bug2, { name: "test" }, Color.Bug1)).toThrow("Invalid bug");
    expect(() => new WorldCell(false, 5, Color.Bug2, null, ".asd")).toThrow("Invalid base value");
  });

  test("isObstructed", () => {
    expect(worldCell.isObstructed()).toBe(false);
  });

  test("isOccupied", () => {
    expect(worldCell.isOccupied()).toBe(false);
  });

  test("isFriendlyBase", () => {
    expect(worldCell.isFriendlyBase(Color.Bug1)).toBe(true);
    expect(worldCell.isFriendlyBase(Color.Bug2)).toBe(false);
  });

  test("isEnemyBase", () => {
    expect(worldCell.isEnemyBase(Color.Bug1)).toBe(false);
    expect(worldCell.isEnemyBase(Color.Bug2)).toBe(true);
  });

  test("removeBug", () => {
    expect(worldCell.removeBug()).toBe(false);
    expect(worldCell.getBug()).toBe(null);

    var bug = new Bug(1, Color.Bug1, 2, 10, 2, true, null);
    worldCell.setBug(bug);
    expect(worldCell.removeBug()).toBe(true);
    expect(worldCell.getBug()).toBe(null);
  });

  test("getFood", () => {
    expect(worldCell.getFood()).toBe(5);
  });

  test("getBug", () => {
    expect(worldCell.getBug()).toBe(null);
  });

  test("setFood", () => {
    worldCell.setFood(6);
    expect(worldCell.getFood()).toBe(6);
    worldCell.setFood(5);
  });

  test("setBug", () => {
    var bug = new Bug(1, Color.Bug1, 2, 10, 2, true, null);

    expect(worldCell.setBug(bug)).toBe(true);
    expect(worldCell_obstructed.setBug(bug)).toBe(false);

    worldCell.removeBug();
    expect(worldCell.setBug({ name: "test" })).toBe(false);
  });

  test("getBug", () => {
    var bug = new Bug(1, Color.Bug1, 2, 10, 2, true, null);
    worldCell.setBug(bug);

    expect(worldCell.getBug()).toMatchObject(bug);
  });

  test("setMarker", () => {
    expect(() => worldCell.setMarker(",91jamz")).toThrow("Invalid color");
    expect(() => worldCell.setMarker(" ")).toThrow("Invalid color");
    expect(() => worldCell.setMarker(worldCell)).toThrow("Invalid color");
  });

  test("clearMarker", () => {
    expect(() => worldCell.clearMarker(",91jamz")).toThrow("Invalid color");
    expect(() => worldCell.setMarker(" ")).toThrow("Invalid color");
    expect(() => worldCell.setMarker(worldCell)).toThrow("Invalid color");

    worldCell.setMarker(Color.Bug1);
    worldCell.clearMarker(Color.Bug1);

    expect(worldCell.isFriendlyMarker(Color.Bug1)).toBe(false);
    expect(worldCell.isEnemyMarker(Color.Bug1)).toBe(false);
  });

  test("isFriendlyMarker", () => {
    worldCell.setMarker(Color.Bug1);
    expect(worldCell.isFriendlyMarker(Color.Bug1)).toBe(true);
    expect(worldCell.isFriendlyMarker(Color.Bug2)).toBe(false);

    worldCell.clearMarker(Color.Bug1);
    expect(worldCell.isFriendlyMarker(Color.Bug1)).toBe(false);
    expect(worldCell.isFriendlyMarker(Color.Bug1)).toBe(false);
  });

  test("isEnemyMarker", () => {
    worldCell.setMarker(Color.Bug1);
    expect(worldCell.isEnemyMarker(Color.Bug1)).toBe(false);
    expect(worldCell.isEnemyMarker(Color.Bug2)).toBe(true);

    worldCell.clearMarker(Color.Bug1);
    expect(worldCell.isEnemyMarker(Color.Bug1)).toBe(false);
    expect(worldCell.isEnemyMarker(Color.Bug2)).toBe(false);
  });
});

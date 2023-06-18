import { WorldCell } from "../scripts/game_logic/WorldCell.js";
import { Bug } from "../scripts/game_logic/Bug.js";
import { Color } from "../scripts/game_logic/Color.js";
import { Position } from "../scripts/game_logic/Position.js";

describe("WorldCell", () => {
    let cell;
    let     bugOptions = {
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
    const bug1 = new Bug(bugOptions);
    const bug2 = new Bug(bugOptions);
  
    beforeEach(() => {
      cell = new WorldCell(false, 0);
    });
  
    it("should create a new WorldCell with the given values", () => {
      expect(cell.obstructed).toEqual(false);
      expect(cell.food).toEqual(0);
      expect(cell.marker).toBeNull();
      expect(cell.bug).toBeNull();
      expect(cell.base).toBeNull();
    });
  
    it("should throw an error for an invalid base value", () => {
      expect(() => {
        new WorldCell(false, 0, Color.Bug1, null, "invalid_base_value");
      }).toThrowError("Invalid base value");
    });
  
    it("should throw an error for an invalid bug value", () => {
      expect(() => {
        new WorldCell(false, 0, Color.Bug1, {}, null);
      }).toThrowError("Invalid bug");
    });
  
    it("should throw an error for an invalid obstructed value", () => {
      expect(() => {
        new WorldCell("invalid_obstructed_value", 0);
      }).toThrowError("Invalid obstructed value");
    });
  
    it("should throw an error for an invalid food value", () => {
      expect(() => {
        new WorldCell(false, "invalid_food_value");
      }).toThrowError("Invalid amount");
    });
  
    it("should return the obstructed value of the cell", () => {
      expect(cell.isObstructed()).toEqual(false);
    });
  
    it("should return true if there is a bug in the cell, else false", () => {
      expect(cell.isOccupied()).toEqual(false);
      cell.setBug(bug1);
      expect(cell.isOccupied()).toEqual(true);
    });
  
    it("should return true if the cell is the friendly base, else false", () => {
      cell.base = Color.Bug1;
      expect(cell.isFriendlyBase(Color.Bug1)).toEqual(true);
      expect(cell.isFriendlyBase(Color.Bug2)).toEqual(false);
    });
  
    it("should return true if the cell is the enemy base, else false", () => {
      cell.base = Color.Bug1;
      expect(cell.isEnemyBase(Color.Bug1)).toEqual(false);
      expect(cell.isEnemyBase(Color.Bug2)).toEqual(true);
    });
  
    it("should set the food attribute to the given amount", () => {
      cell.setFood(10);
      expect(cell.food).toEqual(10);
    });
  
    it("should throw an error for a NaN food value", () => {
      expect(() => {
        cell.setFood("invalid_food_value");
      }).toThrowError("NaN");
    });
});
     
  
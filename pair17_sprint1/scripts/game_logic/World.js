import { Bug } from "./Bug.js";
import { Position } from "./Position.js";
class World {
  constructor(x, y) {
    if (typeof x != "number" || typeof y != "number") {
      throw new Error("Invalid dimensions");
    }
    if (x < 0 || y < 0) {
      throw new Error("Invalid dimensions");
    }
    this.x = x;
    this.y = y;
    this.map = Array.from({ length: y }, () => Array.from(Array(x)));
  }

  /**
   *
   * @param {Position} pos
   * @returns Boolean
   *
   * Wrapper function for WorldCell.isObstructed()
   */
  isObstructedAt(pos) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    return this.cellAt(pos).isObstructed();
  }

  /**
   *
   * @param {Position} pos
   * @param {Integer} amt
   *
   * Wrapper function for WorldCell.setFood(amt)
   */
  setFoodAt(pos, amt) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    if (typeof amt != "number") {
      throw new Error("Invalid amount");
    }
    this.cellAt(pos).setFood(amt);
  }

  /**
   *
   * @param {Position} Position
   * @param {Bug} Bug
   * @returns Boolean
   *
   * Wrapper function for WorldCell.setBug(Bug)
   */
  setBugAt(pos, bug) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    if (!(bug instanceof Bug)) {
      throw new Error("Invalid bug");
    }
    return this.cellAt(pos).setBug(bug);
  }

  setMarkerAt(pos, Color, int) {}

  /**
   *
   * @param {Position} pos
   * @returns Cell
   *
   * Returns cell at Position
   */
  cellAt(pos) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    return map[pos.x][pos.y];
  }

  /**
   *
   * @param {Position} pos
   * @returns Integer
   *
   * Wrapper function for WorldCell.getFood()
   */
  getFoodAt(pos) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    return this.cellAt(Position).getFood();
  }

  /**
   *
   * @param {Position} pos
   * @returns Bug
   *
   * Wrapper function for WorldCell.getBug()
   */
  getBugAt(pos) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    return this.cellAt(pos).getBug();
  }

  /**
   *
   * @param {Position} pos
   * @returns Boolean
   *
   * Wrapper function for WorldCell.removeBug()
   */
  removeBugAt(pos) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    return this.cellAt(pos).removeBug();
  }
}

export { World };

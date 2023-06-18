import { Color } from "./Color.js";
import { BugBrain } from "./BugBrain.js";

class Bug {
  /**
   *
   * @param {Integer} id
   * @param {Color} color
   * @param {Integer} state
   * @param {Integer} resting
   * @param {Integer} direction
   * @param {Boolean} hasFood
   * @param {BugBrain} brain
   *
   * Sets object attributes with given values
   */
  constructor(id, color, state, resting, direction, hasFood, brain = null) {
    if (typeof id != "number" || id < 0) {
      throw new Error("Invalid bug id");
    }
    if (color != Color.Bug1 && color != Color.Bug2) {
      throw new Error("Invalid color");
    }
    if (typeof state != "number" || state < 0) {
      throw new Error("Invalid bug state");
    }

    if (typeof resting != "number" || resting < 0) {
      throw new Error("Invalid bug resting value");
    }

    if (typeof direction != "number" || direction < 0) {
      throw new Error("Invalid bug direction");
    }

    if (typeof hasFood != "boolean") {
      throw new Error("Invalid hasFood value");
    }

    if (!(brain instanceof BugBrain) && brain !== null) {
      throw new Error("Invalid BugBrain");
    }

    this.id = id;
    this.color = color;
    this.state = state;
    this.resting = resting;
    this.direction = direction;
    this.hasFood = hasFood;
    this.brain = brain;
  }

  kill() {}

  /**
   *
   * @returns Integer - Position of current instruction from BugBrain
   *
   */
  getPosition() {
    return this.brain.pos;
  }

  /**
   *
   * @returns String - converts Bug attributes to string
   */
  toString() {
    return String.raw`
      id: ${this.id}
      color: ${this.color}
      state: ${this.state}
      resting: ${this.resting}
      direction: ${this.direction}
      this.hasFood: ${this.hasFood}
    `;
  }
}

export { Bug };

class Position {
  /**
   *
   * @param {Integer} x
   * @param {Integer} y
   *
   * Sets object attributes with given values
   */
  constructor(x, y) {
    if (typeof x !== "number" || typeof y !== "number") {
      throw new Error("Invalid Position values");
    }
    if (x >= 0 && y >= 0) {
      this.x = x;
      this.y = y;
    } else {
      throw new Error("Invalid Position values");
    }
  }
}

export { Position };

class BugBrain {
  /**
   *
   * @param {Instruction[]} instructions
   * @param {Integer} pos
   *
   * Sets object attributes with given values
   */
  constructor(instructions, pos) {
    if (typeof pos != "number" || pos < 0) {
      throw new Error("Invalid position");
    }
    this.instructions = instructions;
    this.pos = pos;
  }

  /**
   *
   * @returns Next instruction
   */
  getNextInstruction() {
    this.pos += 1;
    return this.instructions[pos];
  }
}

export { BugBrain };

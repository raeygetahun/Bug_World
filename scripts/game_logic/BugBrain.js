class BugBrain {
  //BugBrain class defination
  constructor(instructions) {
    this.currentInstruction = instructions;
  }

  getNextInstruction() {
    //returns next instruction
    if (!this.currentInstruction) {
      return null;
    }
    const instruction = this.currentInstruction;
    return instruction;
  }

}

export { BugBrain };

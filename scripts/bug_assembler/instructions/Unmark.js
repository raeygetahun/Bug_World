import { Instruction } from "./Instruction.js"

class Unmark extends Instruction {
    /** @type {Instruction} */ then;

    constructor() {
        super();
        this.then = null;
      }
    
    execute(bug) {
        bug.cell.clearMarker(bug.color, this.marker);
        bug.brain.instructionPointer = this.thenLab;
    }
}

export { Unmark }
import { Instruction } from "./Instruction.js"

class Mark extends Instruction {
    /** @type {Instruction} */ then;

    constructor() {
        super();
        this.then = null;
      }
    
    execute(bug) {
        bug.cell.setMarker(bug.color, this.marker);
        bug.brain.instructionPointer = this.thenLab;
    }
}

export { Mark }
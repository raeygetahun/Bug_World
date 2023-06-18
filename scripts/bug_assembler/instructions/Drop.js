import { Instruction } from "./Instruction.js"

class Drop extends Instruction {
    /** @type {Instruction} */ then;

    constructor() {
        super();
        this.then = null;
      }
    
    execute(bug) {
        if (bug.hasFood) {
            bug.cell.returnFood();
            bug.hasFood = false;
        }
        bug.brain.instructionPointer = this.thenLab;
    }
}


export { Drop }
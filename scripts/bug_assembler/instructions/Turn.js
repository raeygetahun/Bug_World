import { Instruction } from "./Instruction.js"

class Turn extends Instruction {
    /** @type {Instruction} */ then;

    /**
     * 
     * @param {Direction} dir 
     * 
     * Sets object attributes with given values, then is null
     */
    constructor(dir) {
        super();
        this.dir = dir;
        this.then = null;
      }
    
    execute(bug) {
        bug.direction = bug.direction.turnedBy(this.turnDir, this.value);
        bug.brain.instructionPointer = this.thenLab;
    }
}

export { Turn }
import { Instruction } from "./Instruction.js"

class Sense extends Instruction {
    /** @type {Instruction} */ then;
    /** @type {Instruction} */ else;

    /**
     * 
     * @param {CellDirection} dir 
     * @param {Condition} cond 
     * 
     * Sets object attributes with given values, then and else are nulls
     */
    constructor(sensedDir, condition) {
        super();
        this.sensedDir = sensedDir;
        this.condition = condition;
        this.then = null;
        this.else = null;
      }
    
    // execute(bug) {
    //     const cell = bug.world.sensedCell(bug.position, this.sensedDir);
    //     if (cell.matches(this.condition)) {
    //         bug.brain.instructionPointer = this.thenLab;
    //     } else {
    //         bug.brain.instructionPointer = this.elseLab;
    //     }
    // }
}

export { Sense }
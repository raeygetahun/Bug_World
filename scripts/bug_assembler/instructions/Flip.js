import { Instruction } from "./Instruction.js"

class Flip extends Instruction {
    /** @type {Instruction} */ then;
    /** @type {Instruction} */ else;

    /**
     * 
     * @param {Integer} int 
     * 
     * Sets object attributes with given values, then and else are nulls
     */
    constructor(int) {
        super();
        this.int = int;
        this.then = null;
        this.else = null;
    }
    
    execute(bug) {
        if (Math.floor(Math.random() * this.range) === 0) {
            bug.brain.instructionPointer = this.thenLab;
        } else {
            bug.brain.instructionPointer = this.elseLab;
        }
    }
}

export { Flip }
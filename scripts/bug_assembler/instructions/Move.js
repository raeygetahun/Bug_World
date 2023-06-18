import { Instruction } from "./Instruction.js"

class Move extends Instruction {
    /** @type {Instruction} */ then;
    /** @type {Instruction} */ else;

    constructor() {
        super();
        this.then = null;
        this.else = null;
    }
    
    execute(bug) {
        const nextCell = bug.world.adjacent(bug.position, bug.direction);
        if (bug.world.tryMoveBug(bug, bug.cell, nextCell)) {
            bug.brain.instructionPointer = this.thenLab;
        } else {
            bug.brain.instructionPointer = this.elseLab;
        }
    }
}

export { Move }
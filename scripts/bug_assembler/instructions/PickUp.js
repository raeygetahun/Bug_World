import { Instruction } from "./Instruction.js"

class PickUp extends Instruction {
    /** @type {Instruction} */ then;
    /** @type {Instruction} */ else;

    constructor() {
        super();
        this.then = null;
        this.else = null;
      }
    
    execute(bug) {
        if (!bug.hasFood && bug.cell.tryTakeFood()) {
            bug.hasFood = true;
            bug.brain.instructionPointer = this.thenLab;
        } else {
            bug.brain.instructionPointer = this.elseLab;
        }
    }
}

export { PickUp }
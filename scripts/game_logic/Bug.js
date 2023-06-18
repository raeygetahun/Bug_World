import { Color } from "./Color.js";
import { BugBrain } from "./BugBrain.js";
import { CellDirection } from "../bug_assembler/CellDirection.js"
import { Condition } from "../bug_assembler/Condition.js"
import { Direction } from "../bug_assembler/Direction.js"
import {Instruction} from '../bug_assembler/instructions/Instruction.js' 
import { Sense } from "../bug_assembler/instructions/Sense.js"
import { Mark } from "../bug_assembler/instructions/Mark.js"
import { Unmark } from "../bug_assembler/instructions/Unmark.js"
import { PickUp } from "../bug_assembler/instructions/PickUp.js"
import { Drop } from "../bug_assembler/instructions/Drop.js"
import { Turn } from "../bug_assembler/instructions/Turn.js"
import { Move } from "../bug_assembler/instructions/Move.js"
import { Flip } from "../bug_assembler/instructions/Flip.js"
import { gui } from "../simulator/GUI.js";
class Bug {
  /**
   *
   * @param {Integer} id
   * @param {Color} color
   * @param {Integer} state
   * @param {Integer} resting
   * @param {Integer} direction
   * @param {Boolean} hasFood
   * @param {BugBrain} brain
   *
   * Sets object attributes with given values
   */
  constructor(options) {

    if (typeof options.id != "number" || options. id < 0) {
      throw new Error("Invalid bug id");
    }
    if (options.color != Color.Bug1 && options.color != Color.Bug2) {
      throw new Error("Invalid color");
    }
    if (typeof options.state != "number" || options.state < 0) {
      throw new Error("Invalid bug state");
    }

    if (typeof options.resting != "number" || options.resting < 0) {
      throw new Error("Invalid bug resting value");
    }

    if (typeof options.direction != "number" || options.direction < 0) {
      throw new Error("Invalid bug direction");
    }

    if (typeof options.hasFood != "boolean") {
      throw new Error("Invalid hasFood value");
    }

    if (!(options.brain instanceof BugBrain) && options.brain !== null) {
      throw new Error("Invalid BugBrain");
    }

    this.id = options.id;
    this.color = options.color;
    this.state = options.state;
    this.resting = options.resting;
    this.direction = options.direction;
    this.hasFood = options.hasFood;
    this.brain = options.brain;
    this.world = options.world;
    this.position = options.position;
    if(this.world) this.world.setBugAt(this.position, this)
    if(this.world) this.world.addBug(this)
    this.foodamount=0
  }

  clone() {
    //clone method to create a clone of this object
    const clonedBug = new Bug({
      id: this.id,
      color: this.color,
      state: this.state,
      resting: this.resting,
      direction: this.direction,
      hasFood: this.hasFood,
      brain: this.brain, // Assuming this.brain is either a primitive value or a simple object
      world: null, 
      position: { ...this.position }
    });

    clonedBug.foodamount = this.foodamount;
    return clonedBug;
  }

  /**
   * Sets Bug state to 'dead', which is denoted as -1
   */
  kill() {
    this.state = -1;
  }
  

  isDead() {
    return this.state === -1;
  }

  /**
   *
   * @returns Integer - Position of current instruction from BugBrain
   *
   */
  getPosition() {
    return this.brain.pos;
  }

  /**
   *
   * @returns String - converts Bug attributes to string
   */
  toString() {
    return String.raw`
      id: ${this.id}
      color: ${this.color}
      state: ${this.state}
      resting: ${this.resting}
      direction: ${this.direction}
      this.hasFood: ${this.hasFood}
    `;
  }

  async executeNextInstruction(instruction) {
    //excute next instruction for this bug
    if (instruction instanceof Sense) {
      this.sense(instruction);
    } else if (instruction instanceof Turn) {
      this.turn(instruction);
    } else if (instruction instanceof Mark) {
      this.mark(instruction);
    } else if (instruction instanceof Unmark) {
      this.unmark(instruction);
    } else if (instruction instanceof PickUp) {
      this.pickUp(instruction);
    } else if (instruction instanceof Drop) {
      this.drop(instruction);
    } else if (instruction instanceof Flip) {
      this.flip(instruction);
    } else if (instruction instanceof Move) {
      this.move(instruction);
    }
  }
  

  /**
   * 
   * @param {CellDirection} dir 
   * @param {Condition} cond 
   * 
   * @returns {Boolean}
   * 
   * Checks if the cell in dir matches cond
   */  
  sense(instruction) {
    //excute sense instruction
    let dir=this.direction;
    switch (instruction.sensedDir){
      case 'ahead':
         dir=this.direction 
        break;
      case 'LeftAhead':
        if(this.direction===6){
           dir=0
        }
        else{
           dir=this.direction+1
        }
        break;
        
      case 'RightAhead':
        if(this.direction===0){
           dir=6
        }
        else{
           dir=this.direction-1
        }
        break;

    }

    const cell = this.world.sensedCell(this.position, dir);
    if (!cell.isObstructed() && cell.cellMatches(instruction.condition,this.color)) {
      this.brain.currentInstruction = instruction.then;
    } else {
      this.brain.currentInstruction = instruction.else;
    }
  }

  flip(instruction){
    //excute flip instruction
    if (Math.floor(Math.random() * instruction.int) === 0) {
      this.brain.currentInstruction = instruction.then;
    } else {
      this.brain.currentInstruction = instruction.else;
    }
  }

  mark(instruction) {
    //excute mark instruction
    this.cell.setMarker(this.color, instruction.marker);
    this.brain.currentInstruction = instruction.then;
  }

  unmark(instruction) {
    //excute unmark instruction
    this.cell.clearMarker(this.color, instruction.marker);
    this.brain.currentInstruction = instruction.then;
  }

  /**
   * 
   * @returns {Boolean}
   * 
   * Tries to pick up food from the current cell 
   * and returns true if there is any and bug doesn't
   * carry food already
   */
  pickUp(instruction) {
    if (!this.hasFood && this.world.cellAt(this.position).hasfood()) {
      this.hasFood = true;
      this.brain.currentInstruction = instruction.then;
      this.foodamount=this.world.cellAt(this.position).getFood()
      this.world.totalfood-=this.foodamount
      this.world.setFoodAt(this.position,null)
    } else {
      this.brain.currentInstruction = instruction.else;
    }
  }

  /**
   * 
   * Drops food if carrying any
   */
  drop(instruction) {
    if (this.hasFood) {
      this.hasFood = false;
      let cell=this.world.cellAt(this.position)
      this.world.setFoodAt(this.position, this.foodamount)
      this.world.totalfood-=cell.getFood()
      this.world.bug1food+=cell.getFood()
    }
    this.brain.currentInstruction = instruction.then;
  }

  /**
   * 
   * @param {Direction} dir 
   * 
   * Turns in the direction dir
   */
  turn(instruction) {
    this.direction = this.turnedBy(instruction.dir);
    this.brain.currentInstruction = instruction.then;
  }

  /**
   * 
   * @returns {Boolean}
   * 
   * Moves forward and returns true if the moving was successful
   */
  move(instruction) {
    const nextCell = this.world.adjacentPos(this.position, this.direction);
      if (this.world.tryMoveBug(this, nextCell,this.position)) {
        this.position=nextCell
        this.brain.currentInstruction = instruction.then;
      } else {
        this.brain.currentInstruction = instruction.else;
      }
  }

  turnedBy(turndir){
    //turns in the directionof turndir
    let newdir
    if(turndir=='Right'){
      if(this.direction==5){
        newdir=0
      }
      else{
        newdir=this.direction+1
      } 
    }
    else{
      if(this.direction==0){
        newdir=5
      }
      else{
        newdir=this.direction-1
      }
    }
    return newdir%6
  }

}

export { Bug };

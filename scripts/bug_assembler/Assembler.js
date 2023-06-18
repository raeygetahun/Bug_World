import { Instruction } from "./instructions/Instruction.js";
import { CellDirection } from "./CellDirection.js"
import { Direction } from "./Direction.js"
import { Condition } from "./Condition.js"
import { Sense } from "./instructions/Sense.js"
import { Mark } from "./instructions/Mark.js"
import { Unmark } from "./instructions/Unmark.js"
import { PickUp } from "./instructions/PickUp.js"
import { Drop } from "./instructions/Drop.js"
import { Turn } from "./instructions/Turn.js"
import { Move } from "./instructions/Move.js"
import { Flip } from "./instructions/Flip.js"

class Assembler {
  /**
   *
   * @param {File} file
   * @returns {Instruction} - the first state of finite automata
   *
   * Parses file and returns the finite automata
   */
  assemble(file) {
    file = file.replaceAll(new RegExp(Assembler.comment, "gm"), ""); // deleting all comments

    if (!new RegExp(Assembler.program).test(file)) { // check if file matches the regex of a program
        throw new Error("Bug file: incorrect syntax");
    }

    let strings = file.match(RegExp(Assembler.instruction, "gm")); // split file into single instructions
    let instructions = [];
    let next = [];

    // parse individual instructions
    strings.forEach((str, _idx) => {
        let arr = str.split(" ");
        let instr;
        switch (arr[0]) {
            case "sense":
                let cond = this.#getCond(arr[4]);
                instr = new Sense(
                    this.#getDir(arr[1]),
                    cond
                );
                next.push([arr[2], arr[3]]);
                break;
            case "mark":
                instr = new Mark();
                next.push([arr[1], null]);
                break;
            case "unmark":
                instr = new Unmark();
                next.push([arr[1], null]);
                break;
            case "pickup":
                instr = new PickUp();
                next.push([arr[1], arr[2]]);
                break;
            case "drop":
                instr = new Drop();
                next.push([arr[1], null]);
                break;
            case "turn":
                instr = new Turn(this.#getLeftRight(arr[1]));
                next.push([arr[2], null]);
                break;
            case "move":
                instr = new Move();
                next.push([arr[1], arr[2]]);
                break;
            case "flip":
                instr = new Flip(parseInt(arr[1]));
                next.push([arr[2], arr[3]]);
                break;
        }
        instructions.push(instr);
    });

    // link all instructions into the finite automata
    for (let i = 0; i < instructions.length; ++i) {
        if (next[i][0] >= instructions.length) {
            throw new Error("Bug file: link to a non-existent line");
        }
        instructions[i].then = instructions[next[i][0]];
        if (next[i][1] != null) {
            if (next[i][1] >= instructions.length) {
                throw new Error("Bug file: link to a non-existent line");
            }
            instructions[i].else = instructions[next[i][1]];
        }
    }

    return instructions[0];
  }

  #getDir(dir) {
    switch (dir) {
        case "here": return CellDirection.Here;
        case "leftahead": return CellDirection.LeftAhead;
        case "rightahead": return CellDirection.RightAhead;
        case "ahead": return CellDirection.Ahead;
    }
  }

  #getLeftRight(leftright) {
      switch (leftright) {
          case "left": return Direction.Left;
          case "right": return Direction.Right;
      }
  }

  #getCond(cond) {
      switch (cond) {
          case "friend": return Condition.Friend;
          case "foe": return Condition.Foe;
          case "friendwithfood": return Condition.FriendWithFood;
          case "foewithfood" : return Condition.FoeWithFood;
          case "food": return Condition.Food;
          case "rock": return Condition.Rock;
          case "marker": return Condition.Marker;
          case "foemarker": return Condition.FoeMarker;
          case "home": return Condition.Home;
          case "foehome": return Condition.FoeHome;
      }
  }

  static number = "[0-9]+";
  static ws = "[ |\t|\n|\r]";
  static id = "[A-Z|a-z]+";
  static comment = ";[^\n\r]*";
  static nl = "\n\r?";

  static dir = "(here|leftahead|rightahead|ahead)"
  static leftright = "(left|right)"
  static cond = `(friend|foe|friendwithfood|foewithfood|food|rock|marker|foemarker|home|foehome)`
  static instruction = `(sense ${Assembler.dir} ${Assembler.number} ${Assembler.number} ${Assembler.cond}` +
                          `|mark ${Assembler.number}` +
                          `|unmark ${Assembler.number}` +
                          `|pickup ${Assembler.number} ${Assembler.number}` +
                          `|drop ${Assembler.number}` +
                          `|turn ${Assembler.leftright} ${Assembler.number}` +
                          `|move ${Assembler.number} ${Assembler.number}` +
                          `|flip ${Assembler.number} ${Assembler.number} ${Assembler.number})`
  static program = `^${Assembler.ws}*(${Assembler.instruction}${Assembler.ws}+)*${Assembler.instruction}${Assembler.ws}*$`
}

export { Assembler };

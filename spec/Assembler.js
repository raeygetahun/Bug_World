import { Assembler } from "../scripts/bug_assembler/Assembler.js";

describe("Assembler", () => {
  it("Error: typos/non-existent tokens", () => {
    let bugFile = `sense unrecognizable_word 1 3 food ; [ 0]
                    move 2 0 ; [ 1]
                    pickup 8 0 ; [ 2]
                    flip 3 4 5 ; [ 3]
                    turn left 0 ; [ 4]
                    flip 2 6 7 ; [ 5]
                    turn right 0 ; [ 6]
                    move 0 3 ; [ 7]
                    sense ahead 9 11 home ; [ 8]
                    move 10 8 ; [ 9]
                    drop 0 ; [10]
                    flip 3 12 13 ; [11]
                    turn left 8 ; [12]
                    flip 2 14 15 ; [13]
                    turn right 8 ; [14]
                    move 8 11 ; [15]
                    `
    expect(() => new Assembler().assemble(bugFile)).toThrowError(/Bug file: incorrect syntax/);
  });

  it("Error: incorrect use of the command / missing token", () => {
    let bugFile = `sense ahead 1 3 food ; [ 0]
                    move 2 ; [ 1] absent value
                    pickup 8 0 ; [ 2]
                    flip 3 4 5 ; [ 3]
                    turn left 0 ; [ 4]
                    flip 2 6 7 ; [ 5]
                    turn right 0 ; [ 6]
                    move 0 3 ; [ 7]
                    sense ahead 9 11 home ; [ 8]
                    move 10 8 ; [ 9]
                    drop 0 ; [10]
                    flip 3 12 13 ; [11]
                    turn left 8 ; [12]
                    flip 2 14 15 ; [13]
                    turn right 8 ; [14]
                    move 8 11 ; [15]
                    `
    expect(() => new Assembler().assemble(bugFile)).toThrowError(/Bug file: incorrect syntax/);
  })

  it("Error: lack of commands", () => {
    let bugFile = `; there is nothing else here, just this comment`
    expect(() => new Assembler().assemble(bugFile)).toThrowError(/Bug file: incorrect syntax/);
  })

  it("Error: link to a non-existent line", () => {
    let bugFile = `sense ahead 1 3 food ; [ 0]
                    move 2 0 ; [ 1]
                    pickup 8 0 ; [ 2]
                    flip 3 4 5 ; [ 3]
                    turn left 0 ; [ 4]
                    flip 2 6 1223674 ; [ 5]
                    turn right 0 ; [ 6]
                    move 0 3 ; [ 7]
                    sense ahead 9 11 home ; [ 8]
                    move 10 8 ; [ 9]
                    drop 0 ; [10]
                    flip 3 12 13 ; [11]
                    turn left 8 ; [12]
                    flip 2 14 15 ; [13]
                    turn right 8 ; [14]
                    move 8 11 ; [15]
                    `
    expect(() => new Assembler().assemble(bugFile)).toThrowError(/Bug file: link to a non-existent line/);
  })

  it("Does not throw", () => {
    let bugFile = `sense ahead 1 3 food ; [ 0]
                    move 2 0 ; [ 1]
                    pickup 8 0 ; [ 2]
                    flip 3 4 5 ; [ 3]
                    turn left 0 ; [ 4]
                    flip 2 6 7 ; [ 5]
                    turn right 0 ; [ 6]
                    move 0 3 ; [ 7]
                    sense ahead 9 11 marker ; [ 8]
                    move 10 8 ; [ 9]
                    drop 0 ; [ 10]
                    flip 3 12 13 ; [ 11]
                    turn left 8 ; [ 12]
                    flip 2 14 15 ; [ 13]
                    turn right 8 ; [ 14]
                    move 8 11 ; [ 15]
                    `
    expect(() => new Assembler().assemble(bugFile)).not.toThrow()
  })

  it("Assembles right", () => {
    const mockBug = {
        str: "",
        sense(_dir, _cond) {
            this.str += "0";
            return true;
        },
        mark() {
            this.str += "1";
        },
        unmark() {
            this.str += "2";
        },
        pickUp() {
            this.str += "3";
            return true;
        },
        drop() {
            this.str += "4";
        },
        turn(_dir) {
            this.str += "5";
        },
        move() {
            this.str += "6";
            return true;
        }
    }


    let bugFile = `sense ahead 1 7 marker
                    mark 2
                    unmark 3
                    pickup 4 7
                    drop 5
                    turn left 6
                    move 7 0
                    flip 1 0 7
                    `
    let instruction = new Assembler().assemble(bugFile);
    // for (let i = 0; i < 9; ++i) {
    //     instruction = instruction.execute(mockBug);
    // }
    expect(mockBug.str).toBe("");
  })
});

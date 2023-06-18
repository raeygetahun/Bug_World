/**
This is the finite automata, every Instruction is a state
with pointer(s) to next state(s), when it is executed the next
state is returned.
*/
class Instruction {
  constructor() {};

  /**
   * 
   * @param {Bug} bug 
   * @returns {Instruction} - next state
   * 
   * executes this instruction on a given bug
   */
  execute(bug) {};
}

export { Instruction }

import { BugBrain } from "../scripts/game_logic/BugBrain.js";

describe('BugBrain', () => {
    let bugBrain;
    let bugBrain2
  
    beforeEach(() => {
      bugBrain = new BugBrain(['instruction1', 'instruction2', 'instruction3']);
      bugBrain2=new BugBrain()
    });
  
    it('should return the next instruction when getNextInstruction() is called', () => {
      expect(bugBrain.getNextInstruction()).toEqual([ 'instruction1', 'instruction2', 'instruction3' ]);
    });
  
    it('should return null if there are no more instructions', () => {
      expect(bugBrain2.getNextInstruction()).toBeNull();
    });
  });
  
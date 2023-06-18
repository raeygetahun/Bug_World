import { gui } from "./GUI.js";
import { Color } from "../game_logic/Color.js";
import { BugBrain } from "../game_logic/BugBrain.js";
import { Bug } from "../game_logic/Bug.js";

export class Tournament {
  constructor(world,program1,program2){
    this.world=world
    this.program1=program1
    this.program2=program2
    this.currentIteration=0
    this.bug1Num=this.world.getTotalBug("Red")
    this.bug2Num=this.world.getTotalBug("Black")
    gui.setUseMapFile(this.world)
  }
  
  // ... (existing constructor and other methods)
  async run(iteration,ticksPerSecond) {
    gui.setUseMapFile(this.world)
    gui.updateMap()
    this.resetBugsAtNests()// Reset the bugs at their nests
    this.world.setTotalfood()
    this.bug1Num=this.world.getTotalBug("Red")// Store the number of "Red" and "Black" bugs
    this.bug2Num=this.world.getTotalBug("Black")
    gui.updateMap()// Update the GUI map
    const tournamentStatus = this.getCurrentTournamentStatus();
    //gui.updateStat(tournamentStatus);
    await this.executeNextInstructionForAllBugs(iteration,ticksPerSecond);
    //return

  }

  async executeNextInstructionForAllBugs(iteration,ticksPerSecond) {
    //excute instruction one by one for all bugs with a delay
    const delayInMilliseconds = 1000 / ticksPerSecond;
    const allBugs = this.world.getAllBugs();
    return new Promise((resolve) => {
      const executeWithInterval = async (iteration) => {
        if (this.currentIteration < gui.iterations) {
          if (!gui.pause) {
              for (const bug of allBugs) {
                if (!bug.isDead()) {
                  let current = bug.brain.getNextInstruction();
                  bug.executeNextInstruction(current);
                  gui.updateMap();
                  const tournamentStatus = this.getCurrentTournamentStatus();
                  gui.updateStat(tournamentStatus);
                }
              }
            this.currentIteration++;
          }
          else{
            while (gui.pause) {
              await new Promise((r) => setTimeout(r, delayInMilliseconds));
            }  

          }
  
          setTimeout(() => {
            executeWithInterval(iteration);
          }, 1000/gui.tick);
        } else {
          resolve();
        }
      };
  
      executeWithInterval(iteration);
    });
  }

  static bugId=0;
  genBugId() {
      return Tournament.bugId++;
  }
  
  resetBugsAtNests() {
    //reset bugs to nest
    const positions=this.world.firstNestPositions()
    for (let pos of positions) {
      try {
        let bug = new Bug({
          id: this.genBugId(),
          color: Color.Bug1,
          world: this.world,
          position: pos,
          brain: new BugBrain(this.program1),
          direction: 0,
          hasFood: false,
          state: 0,
          resting: 0
      });
    
        // ...
      } catch (err) {
        console.error(err);
      }
      
    }
    for (let pos of this.world.secondNestPositions()) {
      try {
        let bug = new Bug({
          id: this.genBugId(),
          color: Color.Bug2,
          world: this.world,
          position: pos,
          brain: new BugBrain(this.program2),
          direction: 0,
          hasFood: false,
          state: 0,
          resting: 0
      });
    
        // ...
      } catch (err) {
        console.error(err);
      }
        // this.world.setBugAt(position, bug);
    }
  }
  
  getCurrentTournamentStatus(){
    //return an array of stat about the tournament
    let iterations=this.currentIteration;
    let undetectedFood=this.world.getUndetectedFood()
    let remainingBug1= this.world.getTotalBug("Red")
    let deadBug1=this.bug1Num-remainingBug1
    let foodBug1=this.world.getFoodBroughttoNest("Red")
    let remainingBug2=this.world.getTotalBug("Black")
    let deadBug2=this.bug2Num-remainingBug2 
    let foodBug2=this.world.getFoodBroughttoNest("Black")
    let bugFood=this.world.totalFood-undetectedFood
    return [
      iterations,
      undetectedFood,
      remainingBug1,
      deadBug1,
      foodBug1,
      remainingBug2,
      deadBug2,
      foodBug2,
      bugFood
    ]; 

  }

  
}

import {Engine} from "./engine.js"
import {Tournament} from "./Tournament.js"
import { gui } from "./GUI.js";

class SimulationSettings {
  setWorld(world) {
      this.world = world.clone();
      this.world2 = world.clone();// deep copy of the world object
  }

  setProgram1(Program1) {
      this.Program1 = Program1;
  }

  setProgram2(Program2) {
      this.Program2 = Program2;
  }
  reset() {
    this.world = null;
    this.Program1 = null;
    this.Program2 = null;
  }
}

//export an instance of SimulationSettings
export const simulationSettings1 = new SimulationSettings();

export class Simulation {
  constructor(simulationSettings) {
      if (simulationSettings.world == null && simulationSettings.world2==null) {
          throw new Error("World is null");
      }
      if (simulationSettings.Program1 == null) {
          throw new Error("Red program is null");
      }
      if (simulationSettings.Program2 == null) {
          throw new Error("Black program is null");
      }

      this.world = simulationSettings.world;
      this.world2=simulationSettings.world2;
      this.Program1 = simulationSettings.Program1;
      this.Program2 = simulationSettings.Program2;
      //create two tournaments and change the order of the two programs 
      this.tournament1 = new Tournament(this.world, this.Program1, this.Program2);
      this.tournament2 = new Tournament(this.world2, this.Program1, this.Program2);
      this.engine = new Engine(this.world, this.Program1, this.Program2, 1000);      
  }

  runTournament = async function (tournamentNo, iteration, ticksPerSecond) {
    return new Promise(async (resolve) => {
      for (let i = 0; i < tournamentNo.world.x; i++) {
        for (let j = 0; j < tournamentNo.world.y; j++) {
          let cell=tournamentNo.world.map[i][j]
        }
      }
      await tournamentNo.run(iteration, ticksPerSecond);
      resolve();
    });
  };

}

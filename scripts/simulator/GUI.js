import { updateGridContents } from "./updategrid.js";
import {updateStatistics} from "./updategamestat.js"

class GUI {
  constructor(activatingLogOutput, iterations) {
    //sets the properties
    this.activatingLogOutput = activatingLogOutput;
    this.iterations = iterations;
    this.tick=50;
    this.pause=false;
  }

  updateMap() {
    //calls updateGridContents to update the map displayed
    if (this.world) {
      updateGridContents(this.world);
    } else {
      console.error("World not set. Use setUseMapFile() method to set the world.");
    }
  }
  updateStat(stat){
     //calls updateStatistics to update the stat displayed
    updateStatistics(stat)
  }

  //setter and getter methods

  setIterationsNumber(num) {
    this.iterations = num;
  }

  setUseMapFile(world) {
    this.world=world;
  }

  setOptions(bool) {
    this.activatingLogOutput = true;
  }

  getIterationsNumber() {
    return this.iterations;
  }
  setTick(tick){
    this.tick=tick
  }  
  pause() {
    this.pause=true
  }

  resume() {
    this.pause=false
   
  }

}


export const gui = new GUI();

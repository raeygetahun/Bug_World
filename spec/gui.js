import { gui } from "../scripts/simulator/GUI.js";

describe("GUI", () => {

  
  
    describe("setIterationsNumber", () => {
      it("should set iterations number to given value", () => {
        gui.setIterationsNumber(50);
        expect(gui.getIterationsNumber()).toEqual(50);
      });
    });
  
    describe("setUseMapFile", () => {
      it("should set the world to the given value", () => {
        const world = {};
        gui.setUseMapFile(world);
        expect(gui.world).toBe(world);
      });
    });
  
    describe("setOptions", () => {
      it("should set activatingLogOutput to true", () => {
        gui.setOptions(true);
        expect(gui.activatingLogOutput).toBe(true);
      });
    });
  
    describe("setTick", () => {
      it("should set tick to given value", () => {
        gui.setTick(25);
        expect(gui.tick).toEqual(25);
      });
    });
  });
  
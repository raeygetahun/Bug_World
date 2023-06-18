import { Simulation } from "../scripts/simulator/Simulator.js";
import { simulationSettings1 } from "../scripts/simulator/Simulator.js";
import { World } from "../scripts/game_logic/World.js";
import { Bug } from "../scripts/game_logic/Bug.js";
import { Color } from "../scripts/game_logic/Color.js";
import { Position } from "../scripts/game_logic/Position.js";
import { WorldCell } from "../scripts/game_logic/WorldCell.js";
import { Tournament } from "../scripts/simulator/Tournament.js";
import { Engine } from "../scripts/simulator/engine.js";

describe("Simulation", () => {
    let simulationSettings, simulation;
  
    beforeEach(() => {
      let world = new World(5, 5);
      for (var i = 0; i < 5; i++) {
        for (var j=0;j<5;j++){
        let foodAmount = 0;
        let color = null;
        let obstructed = false;
        world.map[j][i] = new WorldCell(obstructed, foodAmount,null, null, color);
        }
      }
      const program1 = "null";
      const program2 = "null";
      simulationSettings1.setWorld(world);
      simulationSettings1.setProgram1(program1);
      simulationSettings1.setProgram2(program2);
      simulation = new Simulation(simulationSettings1);
    });
  
    describe("constructor", () => {
      it("throws an error if world is null", () => {
        simulationSettings1.world = null;
        expect(() => new Simulation(simulationSettings1)).toThrowError("Cannot read properties of null (reading 'getTotalBug')");
      });
  
      it("throws an error if Red program is null", () => {
        simulationSettings1.Program1 = null;
        expect(() => new Simulation(simulationSettings1)).toThrowError("Red program is null");
      });
  
      it("throws an error if Black program is null", () => {
        simulationSettings1.Program2 = null;
        expect(() => new Simulation(simulationSettings1)).toThrowError("Black program is null");
      });
  
      it("initializes the world and programs correctly", () => {
        expect(simulation.world).toEqual(simulationSettings1.world);
        expect(simulation.Program1).toEqual(simulationSettings1.Program1);
        expect(simulation.Program2).toEqual(simulationSettings1.Program2);
      });
  
      it("creates two tournaments and an engine", () => {
        console.log(simulation.tournament1)
        console.log(simulation.tournament2)
        console.log(simulation.engine)
        expect(simulation.tournament1).toEqual(jasmine.any(Tournament));
        expect(simulation.tournament2).toEqual(jasmine.any(Tournament));
        expect(simulation.engine).toEqual(jasmine.any(Engine));      
      });
    });
  
    describe("runTournament", () => {
      let tournamentNo, iteration, ticksPerSecond;
  
      beforeEach(() => {
        tournamentNo = simulation.tournament1;
        iteration = 100;
        ticksPerSecond = 50;
      });
  
      it("runs a tournament", async () => {
        spyOn(tournamentNo, "run").and.returnValue(Promise.resolve());
        await simulation.runTournament(tournamentNo, iteration, ticksPerSecond);
        expect(tournamentNo.run).toHaveBeenCalledWith(iteration, ticksPerSecond);
      });
    });
  });
  
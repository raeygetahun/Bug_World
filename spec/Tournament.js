import { Simulation } from "../scripts/simulator/Simulator.js";
import { simulationSettings1 } from "../scripts/simulator/Simulator.js";
import { World } from "../scripts/game_logic/World.js";
import { Bug } from "../scripts/game_logic/Bug.js";
import { Color } from "../scripts/game_logic/Color.js";
import { Tournament } from "../scripts/simulator/Tournament.js";
import { WorldCell } from "../scripts/game_logic/WorldCell.js";


describe('Tournament', () => {
  let world;
  let program1;
  let program2;
  let tournament;
  let bugOptions = {
    id: 1,
    color: Color.Bug1,
    state: 0,
    resting: 0,
    direction: 0,
    hasFood: false,
    brain: null,
    world: null,
    position: { x: 0, y: 0 }
  };

  beforeEach(() => {
    world = new World(5, 5);
    for (var i = 0; i < 5; i++) {
      for (var j=0;j<5;j++){
      let foodAmount = 0;
      let color = null;
      let obstructed = false;
      world.map[j][i] = new WorldCell(obstructed, foodAmount,null, null, color);
      }
    }
    program1 = 'testProgram1';
    program2 = 'testProgram2';
    tournament = new Tournament(world, program1, program2);
  });

  it('should initialize a Tournament instance with the correct properties', () => {
    expect(tournament.world).toBe(world);
    expect(tournament.program1).toBe(program1);
    expect(tournament.program2).toBe(program2);
    expect(tournament.currentIteration).toBe(0);
  });

  it('should generate unique bug IDs', () => {
    const id1 = tournament.genBugId();
    const id2 = tournament.genBugId();
    expect(id1).not.toBe(id2);
  });

  it('should reset bugs at nests', () => {
    world.map[0][0].base = Color.Bug1;
    const bug = new Bug(bugOptions);
    world.addBug(bug);
    tournament.resetBugsAtNests();
    const firstNestPositions = world.firstNestPositions();
    firstNestPositions.forEach(position => {
      const bug = world.getBugAt(position);
      expect(bug.color).toBe(Color.Bug1);
    });
  });

  it('should return the current tournament status', () => {
    const status = tournament.getCurrentTournamentStatus();
    expect(status.length).toBe(9);
    expect(status[0]).toBe(tournament.currentIteration);
    expect(status[1]).toBe(world.getUndetectedFood());
    expect(status[2]).toBe(world.getTotalBug("Red"));
    expect(status[3]).toBe(tournament.bug1Num - world.getTotalBug("Red"));
    expect(status[4]).toBe(world.getFoodBroughttoNest("Red"));
    expect(status[5]).toBe(world.getTotalBug("Black"));
    expect(status[6]).toBe(tournament.bug2Num - world.getTotalBug("Black"));
    expect(status[7]).toBe(world.getFoodBroughttoNest("Black"));
    expect(status[8]).toBe(world.totalFood - world.getUndetectedFood());
  });

  // Additional tests for methods like 'run', 'executeNextInstructionForAllBugs', 'setTicks', 'setBug1Color', and 'setBug2Color' can be added here.
});

import { World } from "../scripts/game_logic/World.js";
import { WorldCell } from "../scripts/game_logic/WorldCell.js";
import { Bug } from "../scripts/game_logic/Bug.js";
import { Color } from "../scripts/game_logic/Color.js";
import { Position } from "../scripts/game_logic/Position.js";


describe('World', () => {
    let world;
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

    });
  
    describe('#constructor', () => {
      it('should throw an error for invalid dimensions', () => {
        expect(() => {
          new World('invalid', 10);
        }).toThrow();
        expect(() => {
          new World(-1, 10);
        }).toThrow();
        expect(() => {
          new World(10, 'invalid');
        }).toThrow();
        expect(() => {
          new World(10, -1);
        }).toThrow();
      });
  
      it('should create a world with the specified dimensions', () => {
        expect(world.x).toBe(5);
        expect(world.y).toBe(5);
        expect(world.map.length).toBe(5);
        expect(world.map[0].length).toBe(5);
      });
    });
  
    describe('#clone', () => {
      it('should create a deep copy of the world', () => {
        const bug = new Bug(bugOptions);
        const original = new World(5, 5);
        for (var i = 0; i < 5; i++) {
            for (var j=0;j<5;j++){
            let foodAmount = 0;
            let color = null;
            let obstructed = false;
            original.map[j][i] = new WorldCell(obstructed, foodAmount,null, null, color);
            }
          }
        original.addBug(bug);
        original.setFoodAt(new Position(1, 1), 5);
  
        const cloned = original.clone();
        expect(cloned).toEqual(original);
  
        cloned.addBug(new Bug(bugOptions));
        expect(cloned.bugs.length).toBe(2);
        expect(original.bugs.length).toBe(1);
  
        cloned.setFoodAt(new Position(2, 2), 3);
        expect(cloned.getFoodAt(new Position(2, 2))).toBe(3);
        expect(original.getFoodAt(new Position(2, 2))).toBe(0);
      });
    });
  
    describe('#addBug', () => {
      it('should add a bug to the world', () => {
        const bug = new Bug(bugOptions);
        world.addBug(bug);
        expect(world.bugs.length).toBe(1);
      });
    });
  
    describe('#getAllBugs', () => {
      it('should return all bugs in the world', () => {
        const bug1 = new Bug(bugOptions);
        const bug2 = new Bug(bugOptions);
        world.addBug(bug1);
        world.addBug(bug2);
  
        const bugs = world.getAllBugs();
        expect(bugs.length).toBe(2);
        expect(bugs).toContain(bug1);
        expect(bugs).toContain(bug2);
      });
    });
    it('should throw error if dimensions are not valid numbers', () => {
        expect(() => new World('a', 'b')).toThrow(new Error('Invalid dimensions'));
      });

      it('should throw error if dimensions are negative', () => {
        expect(() => new World(-1, -1)).toThrow(new Error('Invalid dimensions'));
      });
      it('should throw error if position is not valid in isOccupiedAt()', () => {
        expect(() => world.isOccupiedAt('invalid')).toThrow(new Error('Invalid position'));
      });
      it('should throw error if position or amount are not valid in setFoodAt()', () => {
        expect(() => world.setFoodAt('invalid', 5)).toThrow(new Error('Invalid position'));
        expect(() => world.setFoodAt(new Position(1, 1), 'invalid')).toThrow(new Error('Invalid amount'));
      });
      it('should throw error if position or bug are not valid in setBugAt()', () => {
        bugOptions = {
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
          let bug = new Bug(bugOptions);
        expect(() => world.setBugAt('invalid', bug)).toThrow(new Error('Invalid position'));
        expect(() => world.setBugAt(new Position(1, 1), 'invalid')).toThrow(new Error('Invalid bug'));
      });
    
      it('should throw error if position is not valid in cellAt()', () => {
        expect(() => world.cellAt('invalid')).toThrow(new Error('Invalid position'));
      });
    
      it('should throw error if position is not valid in getFoodAt()', () => {
        expect(() => world.getFoodAt('invalid')).toThrow(new Error('Invalid position'));
      });
    
      it('should throw error if position is not valid in getBugAt()', () => {
        expect(() => world.getBugAt('invalid')).toThrow(new Error('Invalid position'));
      });
    
      it('should throw error if position is not valid in removeBugAt()', () => {
        expect(() => world.removeBugAt('invalid')).toThrow(new Error('Invalid position'));
      });
    
      it('should throw error if position or color are not valid in isFriendlyBaseAt()', () => {
        expect(() => world.isFriendlyBaseAt('invalid', Color.Bug1)).toThrow(new Error('Invalid position'));
      });

      describe('sensedCell', () => {
        it('returns the cell in the specified direction from the given position', () => {
          //const world = new World(3, 3);
          const pos = new Position(1, 1);
          const direction = 2;
    
          const result = world.sensedCell(pos, direction);
    
          expect(result).toEqual(world.cellAt(new Position(2, 1)));
        });
      });
    
      describe('firstNestPositions', () => {
        it('returns the positions of the first nest', () => {
          //const world = new World(3, 3);
          world.map[0][0].base = Color.Bug1;
          world.map[2][2].base = Color.Bug1;
    
          const result = world.firstNestPositions();
    
          expect(result).toEqual([new Position(0, 0), new Position(2, 2)]);
        });
      });
    
      describe('secondNestPositions', () => {
        it('returns the positions of the second nest', () => {
          //const world = new World(3, 3);
          world.map[0][1].base = Color.Bug2;
          world.map[2][0].base = Color.Bug2;
    
          const result = world.secondNestPositions();
    
          expect(result).toEqual([new Position(0, 1), new Position(2, 0)]);
        });
      });
    
      describe('adjacentPos', () => {
        it('returns the adjacent position in the specified direction', () => {
          const world = new World(3, 3);
          const pos = new Position(1, 1);
          const direction = 2;
    
          const result = world.adjacentPos(pos, direction);
    
          expect(result).toEqual(new Position(2, 1));
        });
      });
    
    
    
    // Add more tests for the other methods here...
  });
  
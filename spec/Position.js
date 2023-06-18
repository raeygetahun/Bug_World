import { Position } from "../scripts/game_logic/Position.js";

describe('Position', () => {
    it('should set object attributes with given values', () => {
      const position = new Position(2, 3);
      expect(position.x).toEqual(2);
      expect(position.y).toEqual(3);
    });
  
    it('should throw an error if invalid values are passed', () => {
      expect(() => new Position('invalid', 3)).toThrowError('Invalid Position values');
      expect(() => new Position(2, -1)).toThrowError('Invalid Position values');
      expect(() => new Position(-1, 3)).toThrowError('Invalid Position values');
    });
  });
  
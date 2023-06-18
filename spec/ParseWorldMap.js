// import { parseMapFile } from "../scripts/parseMapFile.js";
import { World } from "../scripts/game_logic/World.js";
import { WorldCell } from "../scripts/game_logic/WorldCell.js";
import { Color } from "../scripts/game_logic/Color.js";
import { parseMapFile } from "../scripts/ParseWorldMap.js";

describe("parseMapFile", () => {
  let mapFile;

  beforeEach(() => {
    mapFile = [
      "5",
      "5",
      "#####",
      "#1.2#",
      "#...#",
      "#-+3#",
      "#####",
    ];
  });

  it("should throw an error if width is not equal to height", () => {
    mapFile[0] = "6";
    expect(() => parseMapFile(mapFile)).toThrowError("World file: Map should be square.");
  });

  it("should throw an error if the length of the map is incorrect", () => {
    mapFile.pop();
    expect(() => parseMapFile(mapFile)).toThrowError("World file: Invalid length of map.");
  });

  it("should throw an error if the border is not closed or invalid", () => {
    mapFile[2] = "####";
    expect(() => parseMapFile(mapFile)).toThrowError("World file: Invalid length or border does not close.");
  });

  it("should throw an error if at least one bug swarm is missing", () => {
    mapFile=['5\r', '5\r', '#####\r', '#9.-#\r', '#.#.#\r', '#+.9#\r', '#####']
    mapFile[3] = '#9..#\r';
    expect(() => parseMapFile(mapFile)).toThrowError("World file: At least one bug swarm is missing");
  });

  it("should return a valid World object", () => {
    mapFile=['5\r', '5\r', '#####\r', '#9.-#\r', '#.#.#\r', '#+.9#\r', '#####']
    const world = parseMapFile(mapFile);
    console.log(world.width)
    expect(world).toEqual(jasmine.any(World));
    expect(world.x).toBe(5);
    expect(world.y).toBe(5);

    // Check if the world cells are created correctly
    for (let y = 0; y < world.height; y++) {
      for (let x = 0; x < world.width; x++) {
        const cell = world.map[y][x];
        expect(cell).toEqual(jasmine.any(WorldCell));

        const symbol = mapFile[y + 2][x];
        switch (symbol) {
          case "-":
            expect(cell.color).toBe(Color.Bug1);
            break;
          case "+":
            expect(cell.color).toBe(Color.Bug2);
            break;
          case "#":
            expect(cell.obstructed).toBe(true);
            break;
          default:
            if (!isNaN(Number(symbol))) {
              expect(cell.foodAmount).toBe(Number(symbol));
            } else {
              expect(cell.foodAmount).toBe(0);
            }
            break;
        }
      }
    }
  });
});

import { World } from "./game_logic/World.js";
import { WorldCell } from "./game_logic/WorldCell.js";
import { Color } from "./game_logic/Color.js";
/**
 *
 * @param {Character} ch
 * @returns Boolean
 *
 * True if character is a digit, false otherwise
 */
function isDigit(ch) {
  return !isNaN(parseInt(ch));
}

/**
 *
 * @param {any} val
 * @returns Number
 *
 * Returns Number(val) if val is valid and greater than 0
 */
function toPosInt(val) {
  if (isNaN(Number(val)) || Number(val) < 0) {
    throw new Error("Invalid number");
  }
  return Number(val);
}

/**
 *
 * @param {File} mapFile - the world map file that is parsed
 * @returns {World} - world object with width, height, and cells of the world
 *
 * Checks mapFile for valid length, valid border, valid value, valid number of swarms
 */
function parseMapFile(mapFile) {
  // TODO: Check whether all base cells are linked for each color
  var isBug1Swarm = false;
  var isBug2Swarm = false;

  // Get width and length of world
  try {
    var width = toPosInt(mapFile[0]);
    var height = toPosInt(mapFile[1]);
  } catch (e) {
    throw new Error(e);
  }

  // Check if there are enough lines in the file
  if (mapFile.length != 2 + height) {
    throw new Error("Invalid length of map.");
  }

  // Check first and last line of the map symbols to confirm they are all #'s of length width
  if (mapFile.at(2) != "#".repeat(width) || mapFile.at(-1) != "#".repeat(width)) {
    throw new Error("Invalid length or border does not close.");
  }

  var world = new World(width, height);

  // Start from the third line of the map file
  mapFile.slice(2).every((line, index) => {
    // check valid characters and valid length
    var lineRegex = new RegExp(String.raw`^#[#\d\-+\.]{${width - 2}}#$`, "g");

    line = line.trim(); // trim any whitespace at end

    // Check valid characters, line length, border closing
    if (line.match(lineRegex) == null) {
      throw new Error("Invalid characters or length of line or border does not close");
    }

    /* 
    
      Go through each character of the line,
      compare characters to get corresponding cell type,
      create a WorldCell,
      append to World 
      
    */
    for (var i = 0; i < line.length; i++) {
      let foodAmount = 0;
      let color = null;
      let obstructed = false;
      switch (line[i]) {
        case "-":
          color = Color.Bug1;
          isBug1Swarm = true;
          break;
        case "+":
          color = Color.Bug2;
          isBug2Swarm = true;
          break;
        case "#":
          obstructed = true;
          break;
        case ".":
          break;
        default:
          if (isDigit(line[i])) {
            foodAmount = Number(line[i]);
          }
          break;
      }

      world.map[index][i] = new WorldCell(obstructed, foodAmount, null, null, color);
    }
    return true;
  });

  // check if any bug swarm is missing
  if (!isBug1Swarm || !isBug2Swarm) {
    throw new Error("At least one bug swarm is missing");
  }

  return world;
}

export { parseMapFile };

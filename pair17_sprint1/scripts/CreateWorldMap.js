import { Color } from "./game_logic/Color.js";
/**
 *
 * @param {World} world
 *
 * Creates a world map using given World object
 */
export function createGrid(world) {
  // TODO CreateGrid should reset map before adding child
  var map = document.getElementById("map");
  map.innerHTML = "";

  // make 'map' grid
  map.setAttribute("style", `display:grid; grid-template-columns: repeat(${world.x}, 1fr); border: 3px solid black`);

  // for each cell get cell type and give it corresponding class and append to 'map'
  world.map.every((el) => {
    el.every((cell) => {
      let newCell = document.createElement("div");
      newCell.classList.add("cell");
      cell.obstructed ? newCell.classList.add("obstacle") : null;
      newCell.id = cell.food;

      if (cell.food > 0) {
        newCell.classList.add("food");
      }

      if (cell.base != null) {
        if (cell.base == Color.Bug1) {
          newCell.classList.add("base-bug1");
        }
        if (cell.base == Color.Bug2) {
          newCell.classList.add("base-bug2");
        }
      }

      map.appendChild(newCell);
      return true;
    });
    return true;
  });
}

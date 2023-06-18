import { Color } from "./game_logic/Color.js";
import { Bug } from "./game_logic/Bug.js" // Uncomment this to test bug drawing
/**
 *
 * @param {World} world
 *
 * Creates a world map using given World object
 */
export function createGrid(world) {


  var map = document.getElementById("map");
  map.innerHTML = "";

  // Create grid container
  let hexGrid = document.createElement("ul");
  hexGrid.classList.add("hex-grid");
  hexGrid.setAttribute(
    "style",
    `grid-template-rows: repeat(${world.y}, 1fr 2fr) 1fr;
     grid-template-columns: repeat(${world.x * 2 + 1}, 1fr)`
  );

  world.map.every((el, row) => {
    el.every((cell, col) => {
      // Create element that will contain hexagonal cell
      let hexCell = document.createElement("li");
      hexCell.classList.add("hex-cell");
      hexCell.dataset.row = row;
      hexCell.dataset.col = col;
      // Set position of element on the grid
      hexCell.setAttribute(
        "style",
        `grid-row: ${row * 2 + 1} / span 3;
         grid-column: ${col * 2 + 1 + row % 2}/ span 2;`
      );

      // Create new cell and set its classes corresponding to its type
      let newCell = document.createElement("div");
      newCell.classList.add("cell");
      cell.obstructed ? newCell.classList.add("obstacle") : null;

      if (cell.base != null) {
        //cell.bug = new Bug(0, cell.base, 0, 0, 0, false); // Uncomment this to test bug drawing
        if (cell.base == Color.Bug1) {
          newCell.classList.add("base-bug1");
        }
        if (cell.base == Color.Bug2) {
          newCell.classList.add("base-bug2");
        }
      }

      // if (cell.bug != null) {
      //   let bug = document.createElement("div");
      //   bug.classList.add("bug");

      //   let img = document.createElement("img");
      //   img.classList.add("bugImg");
      //   if (cell.bug.color == Color.Bug1) {
      //     img.src = "../resources/GreenBug.svg";
      //   }
      //   if (cell.bug.color == Color.Bug2) {
      //     img.src = "../resources/RedBug.svg";
      //   }
      //   img.setAttribute("style", `transform: rotate(${90 + cell.bug.direction * 60}deg)`)

      //   bug.appendChild(img);
      //   newCell.appendChild(bug);
      // }

      hexCell.appendChild(newCell);
      hexGrid.appendChild(hexCell);
      return true;
    });
    return true;
  });

  map.replaceChildren(hexGrid);


  // var map = document.getElementById("map");
  // map.innerHTML = "";

  // /* Create grid container */
  // let hexGrid = document.createElement("ul");
  // hexGrid.classList.add("hex-grid");
  // hexGrid.setAttribute(
  //   "style",
  //   `grid-template-rows: repeat(${world.y}, 1fr 2fr) 1fr;
  //    grid-template-columns: repeat(${world.x * 2 + 1}, 1fr)`
  // )

  // world.map.every((el, row) => {
  //   el.every((cell, col) => {
  //     /* Create element that will contain hexagonal cell */
  //     let hexCell = document.createElement("li");
  //     hexCell.classList.add("hex-cell");
  //     /* Set position of element on the grid */
  //     hexCell.setAttribute(
  //       "style",
  //        `grid-row: ${row * 2 + 1} / span 3;
  //         grid-column: ${col * 2 + 1 + row % 2}/ span 2;`
  //     )

  //     /* Create new cell and set its classes corresponding to its type */
  //     let newCell = document.createElement("div");
  //     newCell.classList.add("cell");
  //     cell.obstructed ? newCell.classList.add("obstacle") : null;
  //     newCell.id = cell.food;

  //     if (cell.food > 0) {
  //       let food = document.createElement("div");
  //       food.classList.add("foodText");
  //       food.appendChild(document.createTextNode(cell.food));
  //       newCell.appendChild(food);
  //       newCell.classList.add("food");
  //     }

  //     if (cell.base != null) {
  //       cell.bug = new Bug(0, cell.base, 0, 0, 0, false); // Uncomment this to test bug drawing
  //       if (cell.base == Color.Bug1) {
  //         newCell.classList.add("base-bug1");
  //       }
  //       if (cell.base == Color.Bug2) {
  //         newCell.classList.add("base-bug2");
  //       }
  //     }

  //     if (cell.bug != null) {
  //       let bug = document.createElement("div");
  //       bug.classList.add("bug");

  //       let img = document.createElement("img");
  //       img.classList.add("bugImg");
  //       if (cell.bug.color == Color.Bug1) {
  //         img.src = "../resources/GreenBug.svg";
  //       }
  //       if (cell.bug.color == Color.Bug2) {
  //         img.src = "../resources/RedBug.svg";
  //       }
  //       img.setAttribute("style", `transform: rotate(${90 + cell.bug.direction * 60}deg)`)

  //       bug.appendChild(img);
  //       newCell.appendChild(bug);
  //     }

  //     hexCell.appendChild(newCell);
  //     hexGrid.appendChild(hexCell);
  //     return true;
  //   });
  //   return true;
  // });

  // map.replaceChildren(hexGrid);
}

// Call this function iteratively to update the contents of the cells

import { Color } from "../game_logic/Color.js";
import { Bug } from "../game_logic/Bug.js"

export function updateGridContents(world) {
    world.map.every((el, row) => {
      el.every((cell, col) => {
        let hexCell = document.querySelector(`.hex-cell[data-row="${row}"][data-col="${col}"]`);
        let newCell = hexCell.querySelector(".cell");
  
        // Clear previous contents
        newCell.innerHTML = "";
        newCell.id = cell.food;
  
        if (cell.food > 0) {
          let food = document.createElement("div");
          food.classList.add("foodText");
          food.innerHTML = "&#x1F344;";
          newCell.appendChild(food);
          newCell.classList.add("food");
        } else {
          newCell.classList.remove("food");
        }
  
        if (cell.bug != null) {
          let bug = document.createElement("div");
          bug.classList.add("bug");
  
          let img = document.createElement("img");
          img.classList.add("bugImg");
          if (cell.bug.color == Color.Bug1) {
            img.src = "../resources/GreenBug.svg";
          }
          if (cell.bug.color == Color.Bug2) {
            img.src = "../resources/RedBug.svg";
          }
          // console.log("grid")
          // console.log(cell.bug.direction)
          // console.log("grid")
          
          img.setAttribute("style", `transform: rotate(${90 + cell.bug.direction * 60}deg)`);
  
          bug.appendChild(img);
          newCell.appendChild(bug);
        }
        // console.log("upgrade is done")
        // alert("upgrade is done")
  
        return true;
      });
      return true;
    });
    // console.log("upgrade is done")
    //     alert("upgrade is done")
  }
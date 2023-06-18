import { Bug } from "./Bug.js";
import { Position } from "./Position.js";
import { Color } from "./Color.js";
import { WorldCell } from "./WorldCell.js";

class World {
  constructor(x, y) {
    //world constructor
    if (typeof x != "number" || typeof y != "number") {
      throw new Error("Invalid dimensions");
    }
    if (x < 0 || y < 0) {
      throw new Error("Invalid dimensions");
    }
    this.x = x;
    this.y = y;
    this.map = Array.from({ length: y }, () => Array.from(Array(x)));
    this.bugs=[]
    this.totalFood=0;
  }

  clone() {
    //returns a copy of this object
    const clonedWorld = new World(this.x, this.y);
    clonedWorld.map = this.map.map(row => row.map(cell => cell.clone()));
    clonedWorld.bugs = this.bugs.map(bug => bug.clone());
    clonedWorld.totalFood = this.totalFood;

    return clonedWorld;
  }


  addBug(bug){
    //add the bug the list
    this.bugs.push(bug)
  }

  getAllBugs(){
    return this.bugs
  }

  /**
   *
   * @param {Position} pos
   * @returns Boolean
   *
   * Wrapper function for WorldCell.isObstructed()
   */
  isObstructedAt(pos) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    return this.cellAt(pos).isObstructed();
  }

  /**
   *
   * @param {Position} pos
   * @returns Boolean
   *
   * Wrapper function for WorldCell.isOccupied()
   */
  isOccupiedAt(pos) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    return this.cellAt(pos).isOccupied();
  }

  /**
   *
   * @param {Position} pos
   * @param {Integer} amt
   *
   * Wrapper function for WorldCell.setFood(amt)
   */
  setFoodAt(pos, amt) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    if (amt!==null && typeof amt != "number") {
      throw new Error("Invalid amount");
    }
    this.cellAt(pos).setFood(amt);
  }

  /**
   *
   * @param {Position} Position
   * @param {Bug} Bug
   * @returns Boolean
   *
   * Wrapper function for WorldCell.setBug(Bug)
   */
  setBugAt(pos, bug) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    if (!(bug instanceof Bug)) {
      throw new Error("Invalid bug");
    }
    bug.position=pos
    return this.cellAt(pos).setBug(bug);
  }

  tryMoveBug(bug, nextCell,currentCell){
    //it checks if it is possible to move the bug and move it 
    let cell=this.cellAt(nextCell)
    let cell2=this.cellAt(currentCell)


    if(cell.bug && cell.bug.color!=bug.color){
      cell.getBug().kill()
      this.removeBugAt(nextCell)
    }
    
    if(cell.isObstructed()){
      return false
    }
    else{
      this.removeBugAt(currentCell)
      this.setBugAt(nextCell,bug)
      return true    
    }

  }

  /**
   *
   * @param {Position} pos
   * @returns Cell
   *
   * Returns cell at Position
   */
  cellAt(pos) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    return this.map[pos.x][pos.y];
  }

  /**
   *
   * @param {Position} pos
   * @returns Integer
   *
   * Wrapper function for WorldCell.getFood()
   */
  getFoodAt(pos) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    return this.cellAt(pos).getFood();
  }

  /**
   *
   * @param {Position} pos
   * @returns Bug
   *
   * Wrapper function for WorldCell.getBug()
   */
  getBugAt(pos) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    return this.cellAt(pos).getBug();
  }

  /**
   *
   * @param {Position} pos
   * @returns Boolean
   *
   * Wrapper function for WorldCell.removeBug()
   */
  removeBugAt(pos) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    return this.cellAt(pos).removeBug();
  }

  /**
   *
   * @param {Position} pos
   * @param {Color} color
   * @returns Boolean
   *
   * Wrapper function for WorldCell.isFriendlyBase(color)
   */
  isFriendlyBaseAt(pos, color) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    if (!(Object.values(Color).includes(color))) {
      throw new Error("Invalid color");
    }
    return this.cellAt(pos).isFriendlyBase(color);
  }

  /**
   *
   * @param {Position} pos
   * @param {Color} color
   * @returns Boolean
   *
   * Wrapper function for WorldCell.isEnemyBase(color)
   */
  isEnemyBaseAt(pos, color) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    if (!(Object.values(Color).includes(color))) {
      throw new Error("Invalid color");
    }
    return this.cellAt(pos).isEnemyBase(color);
  }

  /**
   *
   * @param {Position} pos
   * @param {Color} color
   * @param {Integer} value
   * @returns Boolean
   *
   * Wrapper function for WorldCell.setMarker(color, pos)
   */
  setMarkerAt(pos, color, value) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    if (!(Object.values(Color).includes(color))) {
      throw new Error("Invalid color");
    }
    if (value < 0 || value > 5) {
      throw new Error("Marker value ranges from 0 to 5");
    }
    return this.cellAt(pos).setMarker(color, pos);
  }

  /**
   *
   * @param {Position} pos
   * @param {Color} color
   * @param {Integer} value
   * @returns Boolean
   *
   * Wrapper function for WorldCell.clearMarker(color, pos)
   */
  clearMarkerAt(pos, color, value) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    if (!(Object.values(Color).includes(color))) {
      throw new Error("Invalid color");
    }
    if (value < 0 || value > 5) {
      throw new Error("Marker value ranges from 0 to 5");
    }
    return this.cellAt(pos).clearMarker(color, pos);
  }

  /**
   *
   * @param {Position} pos
   * @param {Color} color
   * @param {Integer} value
   * @returns Boolean
   *
   * Wrapper function for WorldCell.isFriendlyMarker(color, pos)
   */
  isFriendlyMarkerAt(pos, color, value) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    if (!(Object.values(Color).includes(color))) {
      throw new Error("Invalid color");
    }
    if (value < 0 || value > 5) {
      throw new Error("Marker value ranges from 0 to 5");
    }
    return this.cellAt(pos).isFriendlyMarker(color, pos);
  }

  /**
   *
   * @param {Position} pos
   * @param {Color} color
   * @param {Integer} value
   * @returns Boolean
   *
   * Wrapper function for WorldCell.isEnemyMarker(color, pos)
   */
  isEnemyMarkerAt(pos, color, value) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    if (!(Object.values(Color).includes(color))) {
      throw new Error("Invalid color");
    }
    if (value < 0 || value > 5) {
      throw new Error("Marker value ranges from 0 to 5");
    }
    return this.cellAt(pos).isEnemyMarker(color, pos);
  }

  /**
   *
   * @returns String - converts World state to string
   */
  toString() {
    let result = ` `;
    for (let i = 0; i < this.y; i++) {
      for (let j = 0; j < this.x; j++) {
        result += `The state of cell (${i}, ${j})\n` + this.map[i][j].toString();
      }
    }
    return result;
  }

  /**
   *
   * @param {Position} pos
   * @param {Integer} direction
   * @returns WorldCell or null if there is no cell in this direction
   *
   * Gives an adjacent cell in the direction
   */
  adjacent(pos, direction) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    if (direction < 0 || direction > 5) {
      throw new Error("Direction value ranges from 0 to 5");
    }
    let i = -1;
    let j = -1; 
     let align=pos.x+1 
  if(align % 2 === 0) { // even cell -> up and down adjacent cells have columns j and j + 1
    switch(direction) {
      case 0:
        i = pos.y+1;
        j = pos.x;
        break;
      case 1:
        i = pos.y + 1;
        j = pos.x + 1;
        break;
      case 2:
        i = pos.y;
        j = pos.x+1;
        break;
      case 3:
        i = pos.y-1;
        j = pos.x;
        break;
      case 4:
        i = pos.y;
        j = pos.x-1;
        break;
      case 5:
        i = pos.y + 1;
        j = pos.x - 1;
        break;
      default:
        break;
    }
  } else { // odd cell -> up and down adjacent cells have columns j - 1 and j
    switch(direction) {
      case 0:
        i = pos.y+1;
        j = pos.x;
        break;
      case 1:
        i = pos.y;
        j = pos.x+1;
        break;
      case 2:
        i = pos.y - 1;
        j = pos.x + 1;
        break;
      case 3:
        i = pos.y-1;
        j = pos.x ;
        break;
      case 4:
        i = pos.y - 1;
        j = pos.x - 1;
        break;
      case 5:
        i = pos.y;
        j = pos.x-1;
        break;
      default:
        break;
    }
  }
    if(i < 0 || j < 0 || i >= this.y || j >= this.x) {
      return null;
    }
    return this.map[j][i];
  }



  /**
   *
   * @param {Integer} direction
   * @param {Integer} turn - 0 if right, 1 if left
   * @returns Integer
   *
   * Changes direction
   */
  turn(direction, turn) {
    if (direction < 0 || direction > 5) {
      throw new Error("Direction value ranges from 0 to 5");
    }
    if (turn < 0 || turn > 1) {
      throw new Error("Turn value can be 0 (right) and 1 (left)");
    }
    if(turn === 0) { // turn to the right
      return (direction + 1) % 6;
    } else { // turn to the left
      return (direction + 5) % 6;
    }
  }

  /**
   *
   * @param {Position} pos
   * @param {Integer} direction
   * @returns WorldCell or null if there is no cell in this direction
   *
   * Determines the target position from position pos and absolute heading direction
   */
  sensedCell(pos, direction) {
    if (!(pos instanceof Position)) {
      throw new Error("Invalid position");
    }
    if (direction < 0 || direction > 5) {
      throw new Error("Direction value ranges from 0 to 5");
    }
    return this.adjacent(pos, direction);
  }

  firstNestPositions() {
    //return position of first Nest 
    let positions = [];
    for (let x = 0; x < this.x; x++) {
        for (let y = 0; y < this.y; y++) {
            if (this.map[x][y].base == Color.Bug1) {
              positions.push(new Position(x, y));
            }
        }
    }
    return positions;
}

secondNestPositions() {
    //return position of second Nest 
    let positions = [];
    for (let x = 0; x < this.x; x++) {
        for (let y = 0; y < this.y; y++) {
            if (this.map[x][y].base == Color.Bug2) {
                positions.push(new Position(x, y));
            }
        }
    }
    return positions;
}

adjacentPos(pos, direction) {
  //returns adjacent position
  if (!(pos instanceof Position)) {
    throw new Error("Invalid position");
  }
  if (direction < 0 || direction > 5) {
    throw new Error("Direction value ranges from 0 to 5");
  }
  let i = -1;
  let j = -1;
  let align=pos.x+1 
  if(align % 2 === 0) { // even cell -> up and down adjacent cells have columns j and j + 1
    switch(direction) {
      case 0:
        i = pos.y+1;
        j = pos.x;
        break;
      case 1:
        i = pos.y + 1;
        j = pos.x + 1;
        break;
      case 2:
        i = pos.y;
        j = pos.x+1;
        break;
      case 3:
        i = pos.y-1;
        j = pos.x;
        break;
      case 4:
        i = pos.y;
        j = pos.x-1;
        break;
      case 5:
        i = pos.y + 1;
        j = pos.x - 1;
        break;
      default:
        break;
    }
  } else { // odd cell -> up and down adjacent cells have columns j - 1 and j
    switch(direction) {
      case 0:
        i = pos.y+1;
        j = pos.x;
        break;
      case 1:
        i = pos.y;
        j = pos.x+1;
        break;
      case 2:
        i = pos.y - 1;
        j = pos.x + 1;
        break;
      case 3:
        i = pos.y-1;
        j = pos.x ;
        break;
      case 4:
        i = pos.y - 1;
        j = pos.x - 1;
        break;
      case 5:
        i = pos.y;
        j = pos.x-1;
        break;
      default:
        break;
    }
  }
  if(i < 0 || j < 0 || i >= this.y || j >= this.x) {
    return null;
  }
  return new Position (j,i);
}
getTotalBug(color){
  //return total number of bugs
  let count = 0;
  for (let i = 0; i < this.x; i++) {
    for (let j = 0; j < this.y; j++) {
      let bug=this.map[i][j].getBug()
      if(bug && bug.color === color){
        count++;
      }
    }
  }
  return count; 
}

getUndetectedFood(){
  //return total number of undetected foods
  let count = 0;
  for (let i = 0; i < this.x; i++) {
    for (let j = 0; j < this.y; j++) {
      let cell=this.map[i][j]
      if(cell.food && !cell.base){
        count+=cell.food;
      }
    }
  }
  return count; 
}

getFoodBroughttoNest(color){
  //return total number of foods brought to nest for given color
  let count = 0;
  for (let i = 0; i < this.x; i++) {
    for (let j = 0; j < this.y; j++) {
      let cell=this.map[i][j]
      if(cell.food && cell.base==color){
        count+=cell.food;
      }
    }
  }
  return count; 
}
getTotalFood(){
  //return total number of food
  let count = 0;
  for (let i = 0; i < this.x; i++) {
    for (let j = 0; j < this.y; j++) {
      let cell=this.map[i][j]
      if(cell.food){
        count+=cell.food;
      }
    }
  }
  return count; 
}
setTotalfood(){
  //set total food to its property
  this.totalFood=this.getTotalFood()
}

}

export { World };

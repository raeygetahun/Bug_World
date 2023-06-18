import { Color } from "./Color.js";
import { Bug } from "./Bug.js";
import { Condition } from "../bug_assembler/Condition.js"

class WorldCell {
  /**
   *
   * @param {Boolean} obstructed
   * @param {Integer} food
   * @param {Color} marker
   * @param {Bug} bug
   * @param {Color} base
   *
   * Sets attributes of object with given values
   */
  constructor(obstructed, food, marker = null, bug = null, base = null) {
    if (marker != Color.Bug1 && marker != Color.Bug2 && marker !== null) {
      throw new Error("Invalid marker value");
    }
    if (base != Color.Bug1 && base != Color.Bug2 && base !== null) {
      throw new Error("Invalid base value");
    }
    if (!(bug instanceof Bug) && bug !== null) {
      throw new Error("Invalid bug");
    }
    if (typeof obstructed !== "boolean") {
      throw new Error("Invalid obstructed value");
    }
    if (typeof food !== "number") {
      throw new Error("Invalid amount");
    }
    this.obstructed = obstructed;
    this.bug = bug;
    this.food = food;
    this.marker = marker;
    this.base = base;
  }

  clone() {
    let newBug
    if(this.bug){
       newBug= this.bug.clone()
    }
    else{
       newBug = null
    } 
    
    //return a clone for this object
    const clonedWorldCell = new WorldCell(
      this.obstructed,
      this.food,
      this.marker,
      newBug,
      this.base
    );
    return clonedWorldCell;
  }

  /**
   *
   * @returns Boolean - obstructed attribute of Cell
   */
  isObstructed() {
    return this.obstructed;
  }

  /**
   *
   * @returns Bug - bug in cell else null
   */
  isOccupied() {
    return this.bug !== null;
  }

  /**
   *
   * @param {Color} color
   * @returns Boolean - true if cell is base of color 'color'
   */
  isFriendlyBase(color) {
    return this.base == color ? true : false;
  }

  /**
   *
   * @param {Color} color
   * @returns Boolean - true if color of base is not 'color'
   */
  isEnemyBase(color) {
    return this.base != color ? true : false;
  }

  /**
   *
   * @param {Integer} amt
   *
   * Set object food attribute to amt
   */
  setFood(amt) {
    if (amt !== null & typeof amt !== "number") {
      throw new Error("NaN");
    }
    this.food = amt;
  }

  /**
   *
   * @param {Bug} bug
   * @returns Boolean - true if successful
   *
   * Set object bug attribute to Bug if cell not obstructed
   */
  setBug(bug) {
    if (this.isObstructed() || !(bug instanceof Bug)) {
      return false;
    } else {
      this.bug = bug;
      this.obstructed = true;
      return true;
    }
  }

  /**
   *
   * @returns Bug - bug attribute of object
   */
  getBug() {
    return this.bug;
  }

  /**
   *
   * @returns Integer - food attribute of object
   */
  getFood() {
    return this.food;
  }

  hasfood(){
    return this.food > 0;
  }

  /**
   *
   * @returns Boolean - true on success
   * If there is bug in cell, set it to null (i.e. remove it )
   */
  removeBug() {
    //remove bug from this cell si that it can go to other cells
    if (this.getBug()) {
      this.bug = null;
      this.obstructed = false;
      return true;
    } else {
      return false;
    }
  }

  /**
   *
   * @param {Color} color
   * @param {Position} position
   *
   * Set marker attribute of object to color
   */
  setMarker(color, position = null) {
    if (color != Color.Bug1 && color != Color.Bug2) {
      throw new Error("Invalid color");
    }
    this.marker = color;
  }

  /**
   *
   * @param {Color} color
   * @param {Position} position
   *
   * Set marker attribute of object to null
   */
  clearMarker(color, position = null) {
    if (color != Color.Bug1 && color != Color.Bug2 && color != null) {
      throw new Error("Invalid color");
    }
    this.marker = null;
  }

  /**
   *
   * @param {Color} color
   * @param {Position} position
   * @returns Boolean - true if color of marker equal to 'color'
   */
  isFriendlyMarker(color, position = null) {
    if (color != Color.Bug1 && color != Color.Bug2) {
      throw new Error("Invalid color");
    }

    return this.marker == null ? false : this.marker === color;
  }

  /**
   *
   * @param {Color} color
   * @param {Position} position
   * @returns Boolean - true if color of marker not equal to 'color'
   */
  isEnemyMarker(color, position = null) {
    if (color != Color.Bug1 && color != Color.Bug2) {
      throw new Error("Invalid color");
    }
    return this.marker == null ? false : this.marker !== color;
  }

  /**
   *
   * @param {Position} position
   * @param {Condition} condition
   * @param {Color} color
   * @returns Boolean - true if Condition is true
   */
  cellMatches(condition, color) {
    switch (condition) {
      case Condition.Foe:
        return this.bug.color !== color;
      case Condition.Friend:
        return this.bug.color === color;
      case Condition.FriendWithFood:
        return this.bug.color === color && this.bug.hasFood;
      case Condition.FoeWithFood:
        return this.bug.color !== color && this.bug.hasFood;
      case Condition.Home:
        return this.isFriendlyBase(color);
      case Condition.FoeHome:
        return this.isEnemyBase(color);
      case Condition.Marker:
        return this.isFriendlyMarker();
      case Condition.FoeMarker:
        return this.isEnemyMarker();
      case Condition.Food:
        return this.food > 0;
      case Condition.Rock:
        return this.isObstructed() && !this.isOccupied();
      default:
        alert("Invalid condition");
        return false;
    }
  }

  

  matches(condition,color){
    this.cellMatches(condition,color)

  }


  /**
   *
   * @returns String - converts Cell values to string
   */
  toString() {
    return String.raw`
      obstructed: ${this.isObstructed()}
      food: ${this.getFood()}
      marker: ${this.marker}
      bug: ${this.getBug() == null ? String.raw`No Bug` : this.getBug().toString()}
      base: ${this.base}
    `;
  }
}

export { WorldCell };

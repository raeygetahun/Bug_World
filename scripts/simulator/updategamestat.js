// import { gui } from "./simulator/GUI.js";

export function updateStatistics(statusArray) {
    document.getElementById("iteration-count-value").innerHTML = statusArray[0];
    document.getElementById("undetected-food-value").innerHTML = statusArray[1];
    document.getElementById("remaining-red-value").innerHTML = statusArray[2];
    document.getElementById("dead-red-value").innerHTML = statusArray[3];
    document.getElementById("food-red-value").innerHTML = statusArray[4];
    document.getElementById("remaining-black-value").innerHTML = statusArray[5];
    document.getElementById("dead-black-value").innerHTML = statusArray[6];
    document.getElementById("food-black-value").innerHTML = statusArray[7];
    document.getElementById("bugs-food-value").innerHTML = statusArray[8];
  }
  
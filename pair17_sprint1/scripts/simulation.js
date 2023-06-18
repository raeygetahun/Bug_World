import { show, onClickSwitchPage } from "./PageSwitch.js";
import { renameFile, parseWorld, parseBug } from "./Files.js";
import { GUI } from "./simulator/GUI.js";
import { Color } from "./game_logic/Color.js";
var gameOptions = {};
var gui = new GUI();

/**
 *
 * @param {Element} e - Next button element
 * @returns
 *
 * reads world, bug1, bug2 files and on successful parsing submits form.
 */
async function settingsNextHandler(el) {
  el.preventDefault();

  const worldFile = document.getElementById("world-file");
  const bug1File = document.getElementById("bug1-file");
  const bug2File = document.getElementById("bug2-file");

  try {
    const worldResponse = parseWorld(worldFile);
    const bug1Response = parseBug(bug1File);
    const bug2Response = parseBug(bug2File);
    await Promise.all([worldResponse, bug1Response, bug2Response]);
    document.getElementById("settings-page").requestSubmit();
  } catch (e) {
    alert(e);
  }
}
/**
 *
 * @param {Element} e
 * @returns false
 * Gets submitted data from Form and stores it in gameOptions, and set in GUI
 * Then, hides simulator.html and shows settings-page.html
 */
function getFormData(e) {
  e.preventDefault();

  gameOptions["log"] = "off"; // make log off by default
  const formData = new FormData(e.target);

  for (var pair of formData.entries()) {
    gameOptions[pair[0]] = pair[1];
  }

  var isLog = gameOptions["log"] === "off" ? false : true;
  gui.setOptions(isLog);
  gui.setIterationsNumber(gameOptions["iterations"]);

  document.getElementById("iteration-number").children[1].value = gui.getIterationsNumber();

  document.getElementById("bug1-color").children[1].value = Color.Bug1;
  document.getElementById("bug2-color").children[1].value = Color.Bug2;

  show("simulator", "settings-page");
  return false;
}

/**
 * Redirects to start.html
 */
function takeToStart() {
  location.href = "./../src/start.html";
}

document.getElementById("settings-page").onsubmit = (e) => getFormData(e);
document.getElementById("next-btn").onclick = (e) => settingsNextHandler(e);
document.getElementById("quit-accept-btn").onclick = () => takeToStart();

onClickSwitchPage("quit-btn", "quit-page", "simulator");
onClickSwitchPage("quit-decline-btn", "simulator", "quit-page");
onClickSwitchPage("option-btn", "options-page", "simulator");
onClickSwitchPage("option-back-btn", "simulator", "options-page");

import { show, onClickSwitchPage } from "./PageSwitch.js";
import { renameFile, parseWorld, parseBug } from "./Files.js";
import { gui } from "./simulator/GUI.js";
import { Color } from "./game_logic/Color.js";
import {simulationSettings1} from './simulator/Simulator.js'
import {Simulation} from './simulator/Simulator.js'

var gameOptions = {};

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
    const [world, bug1, bug2] = await Promise.all([worldResponse, bug1Response, bug2Response])
    simulationSettings1.setWorld(world)
    simulationSettings1.setProgram1(bug1)
    simulationSettings1.setProgram2(bug2)
  
    await new Promise((resolve) => {
      document.getElementById("settings-page").requestSubmit();
      document.getElementById("settings-page").onsubmit = async (e) => {
        await getFormData(e);
        resolve();
      };
    });

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
async function getFormData(e) {

  return new Promise( async (resolve) => {
      e.preventDefault();

      gameOptions["log"] = "off"; // make log off by default
      const formData = new FormData(e.target);

      for (var pair of formData.entries()) {
        gameOptions[pair[0]] = pair[1];
      }

      var isLog = gameOptions["log"] === "off" ? false : true;
      gui.setOptions(isLog);
      gui.setIterationsNumber(gameOptions["iterations"]);

      document.getElementById("bug1-color").children[1].value = Color.Bug1;
      document.getElementById("bug2-color").children[1].value = Color.Bug2;

      show("simulator", "settings-page");
      resolve();
      const simulation1 = new Simulation(simulationSettings1);
      await simulation1.runTournament(simulation1.tournament1, gui.iterations,gui.tick);
      const result1= simulation1.tournament1.getCurrentTournamentStatus()
      printResult(result1,1)


      await simulation1.runTournament(simulation1.tournament2, gui.iterations,gui.tick);
      const result2= simulation1.tournament2.getCurrentTournamentStatus()
      printResult(result2,2)    
   
  })
}

function printResult(result,No){
  if(result[4] > result[7]){
    No===1 ? alert("Player 1 Won in the first Tournament 🏆\nClick OK to continue to the second Tournament") : 
    (alert("Player 1 won in the second Tournament 🏆"),
    show("quit-page", "simulator"));
  }
  else if(result[4] < result[7]){
    No===1 ? alert("Player 2 Won in the first Tournament 🏆\nClick OK to continue to the second Tournament") : 
    (alert("Player 2 won in the second Tournament 🏆"),
    show("quit-page", "simulator"));
  }
  else{
    No===1 ? alert("Draw in the first Tournament Click OK to continue to the second Tournament") : 
    (alert("Draw in the second Tournament"),
    show("quit-page", "simulator"));
  }
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
document.getElementById('option-btn').addEventListener('click', function () {
  gui.pause=true;
});

document.getElementById('option-save-btn').addEventListener('click', function () {
  const bug1Color = document.getElementById('bug1-color').value;
  const bug2Color = document.getElementById('bug2-color').value;
  gui.iterations = document.getElementById('iteration').value;
  gui.tick = document.getElementById('ticks').value;

  // You can use the variables bug1Color, bug2Color, iterations, and tickDuration as needed
});








// ... (existing code)



document.getElementById("option-back-btn").addEventListener("click", () => {
  gui.pause=false
});


onClickSwitchPage("quit-btn", "quit-page", "simulator");
onClickSwitchPage("quit-decline-btn", "simulator", "quit-page");
onClickSwitchPage("option-btn", "options-page", "simulator");
onClickSwitchPage("option-back-btn", "simulator", "options-page");


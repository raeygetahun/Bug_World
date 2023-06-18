import { Assembler } from "./bug_assembler/Assembler.js";
import { parseMapFile } from "./ParseWorldMap.js";
import { createGrid } from "./CreateWorldMap.js";
/**
 *
 * @param {String} originalFileName - File name of the original file
 * @param {String} newFileName - New name for the file
 * @returns File - creates a new File that is the original file, renamed
 */
export function renameFile(originalFileName, newFileName) {
  return new File([originalFileName], newFileName, {
    type: originalFileName.type,
  });
}

/**
 *
 * @param {Element} el
 *
 * Displays file name from input element
 */
function displayFile(el) {
  try {
    let fileName = el.files[0].name;
    let fileElement = document.createElement("div");
    fileElement.innerText = fileName;
    el.nextElementSibling.appendChild(fileElement);
  } catch (e) {
    throw new Error("Invalid element");
  }
}

/**
 * Checks if any files are cached, if there is displays filename
 */
function checkFileDisplayed() {
  var allFiles = document.querySelectorAll(".file");

  allFiles.forEach((el) => {
    if (el.files.length) {
      displayFile(el);
    }
  });
}

/**
 *
 * @param {Input Element} fileUploaded
 *
 * On file upload, displays filename (replaces old filename if already present)
 */
function onUploadHandler(fileUploaded) {
  fileUploaded.onchange = () => {
    try {
      var fileName = fileUploaded.files[0].name;
      fileUploaded.nextElementSibling.children[1].innerHTML = fileName;
    } catch (e) {
      displayFile(fileUploaded);
    }
  };
}

/**
 *
 * @param {Input Element} bugFile
 * @returns Promise - resolves if properly parsed after upload, else rejects
 */
export function parseBug(bugFile) {
  return new Promise((resolve, reject) => {
    if (bugFile.files.length == 0) {
      reject(new Error("Bug file empty"));
    }
    var bugFileContent = new FileReader();
    bugFileContent.readAsText(bugFile.files[0]);

    bugFileContent.onload = (el) => {
      var content = el.target.result.trim();
      var assembler = new Assembler();

      try {
        var bugInstructions = assembler.assemble(content);
        resolve(bugInstructions);
      } catch (e) {
        reject(e);
      }
    };
  });
}

/**
 *
 * @param {Input Element} worldFile
 * @returns Promise
 *
 * If properly parsed after upload it resolves Promise, else rejects
 */
export function parseWorld(worldFile) {
  return new Promise((resolve, reject) => {
    
    // Check if files are empty
    if (worldFile.files.length == 0) {
      reject(new Error("WorldMap file empty"));
    }

    // read contents of World File
    var worldFileContent = new FileReader();

    // When world file is uploaded parse it and create a map/grid

    worldFileContent.onload = (el) => {
      var mapFile = el.target.result.trim().split(/\n/g);

      try {
        var world = parseMapFile(mapFile);
        createGrid(world);
        resolve(world);
      } catch (e) {
        reject(e);
      }
    };

    worldFileContent.readAsText(worldFile.files[0]);
  });
}

document.querySelectorAll(".file").forEach((fileUpload) => onUploadHandler(fileUpload));
window.onload = () => checkFileDisplayed();



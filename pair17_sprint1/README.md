# README for SE_Pair17_Sprint1

**BugWorld** is an environment of two swarms of bugs, where the goal of the bugs is to collect the most food and bring it back to their base. This is an implementation of the game using HTML, CSS, and Javascript. This project aims to implement an assembler to parse bug instructions, a GUI for the simulator, and the actual simulator itself.

## Libraries / Frameworks / Environments

- [Jest](https://jestjs.io/)
- [npm](https://nodejs.org/)

## Sprint 1

- Ayam Banjade
- Eliza Marghidanu

## Getting Started

### Prerequisites

Please install [npm](https://nodejs.org/en/download) to use the testing framework [Jest](https://jestjs.io/).

### Installation

---

#### git Clone

```shell
# Clone the repository
## (via HTTPS)
git clone https://github.com/CU-Software-Engineering-2023/pair17_sprint1.git

## (via ssh)
git clone git@github.com:CU-Software-Engineering-2023/pair17_sprint1.git


# Move to the directory
cd pair17_sprint1/src/
```

Inside `pair17_sprint1/src/`, open `start.html` in your browser.

#### clabsql

You can directly access the website [here](https://clabsql.clamv.jacobs-university.de/~aybanjade). (Note: you need to use Constructor VPN, or be on university premises)

### Usage

---

Valid files to upload are in `pair17_sprint1/input_files/` with the naming scheme `valid-*.world`. Invalid files have the naming scheme `invalid-*.world`. Currently, the bug assemblers are not functional so there is a placeholder `bug.buggy` file as well.

To continue to `simulation.html`, all files must be uploaded and the world map must be valid. The same file can be uploaded for both bug files.

**Note**: The end of game page cannot be accessed directly via the UI of the website currently. You can access it by opening `pair17_sprint1/src/end.html` in your browser OR by using the clabsql link [here](https://clabsql.clamv.jacobs-university.de/~aybanjade/src/end.html)

## Testing

First go to `pair17_sprint1/` and run:

```shell
npm install
```

Then to run the test cases go to `pair17_sprint1/` and run:

```shell
npm test
```

## File Structure

```
pair17_sprint1/
 ┣ input_files/
 ┃ ┣ bug.buggy
 ┃ ┣ invalid-1.world
 ┃ ┣ invalid-2.world
 ┃ ┣ invalid-3.world
 ┃ ┣ invalid-4.world
 ┃ ┣ valid-1.world
 ┃ ┣ valid-2.world
 ┃ ┣ valid-3.world
 ┃ ┗ valid-4.world
 ┣ scripts/
 ┃ ┣ bug_assembler/
 ┃ ┃ ┣ instructions/
 ┃ ┃ ┃ ┣ Direction.js
 ┃ ┃ ┃ ┣ Drop.js
 ┃ ┃ ┃ ┣ Flip.js
 ┃ ┃ ┃ ┣ Label.js
 ┃ ┃ ┃ ┣ Mark.js
 ┃ ┃ ┃ ┣ Move.js
 ┃ ┃ ┃ ┣ PickUp.js
 ┃ ┃ ┃ ┣ Sense.js
 ┃ ┃ ┃ ┣ Turn.js
 ┃ ┃ ┃ ┗ Unmark.js
 ┃ ┃ ┣ Assembler.js
 ┃ ┃ ┣ CellDirection.js
 ┃ ┃ ┣ Condition.js
 ┃ ┃ ┣ Direction.js
 ┃ ┃ ┣ Grammar.js
 ┃ ┃ ┗ peg-0.10.0.min.js
 ┃ ┣ game_logic/
 ┃ ┃ ┣ Bug.js
 ┃ ┃ ┣ BugBrain.js
 ┃ ┃ ┣ BugCondition.js
 ┃ ┃ ┣ Color.js
 ┃ ┃ ┣ Position.js
 ┃ ┃ ┣ World.js
 ┃ ┃ ┗ WorldCell.js
 ┃ ┣ simulator/
 ┃ ┃ ┣ Engine.js
 ┃ ┃ ┣ GUI.js
 ┃ ┃ ┣ Simulator.js
 ┃ ┃ ┗ Tournament.js
 ┃ ┣ CreateWorldMap.js
 ┃ ┣ Files.js
 ┃ ┣ PageSwitch.js
 ┃ ┣ ParseWorldMap.js
 ┃ ┗ simulation.js
 ┣ src/
 ┃ ┣ end.html
 ┃ ┣ simulation.html
 ┃ ┗ start.html
 ┣ styles/
 ┃ ┣ simulation.css
 ┃ ┗ style.css
 ┣ test/
 ┃ ┣ Bug.test.js
 ┃ ┣ ParseWorldMap.test.js
 ┃ ┣ Position.test.js
 ┃ ┗ WorldCell.test.js
 ┣ README.md
 ┣ package-lock.json
 ┗ package.json
```

## Sprint Progress

1. Created functional welcome page
2. Created functional end of game page
3. Created settings page, homepage, change settings page, and a functional quit game page
4. Created enumerations:

- `CellDirection`
- `Direction`
- `Condition`
- `Color`
- `BugCondition`

5. Implemented `Position` class:
   - Constructor
6. Implemented `WorldCell` class:

   - Constructor
   - `isObstructed()`
   - `isOccupied()`
   - `isFriendlyBase(color)`
   - `isEnemyBase(color)`
   - `isFriendlyMarker(color, position)`
   - `isEnemyMarker(color, position)`
   - `cellMatches(position, bugCondition, color)`
   - `setFood(amt)`
   - `setBug(bug)`
   - `clearMarker(color, position)`
   - `setMarker(color, position)`
   - `getBug(bug)`
   - `getFood()`
   - `removeBug()`
   - `toString()`

7. Partially implemented `World` class:
   - Constructor
   - `isObstructedAt(pos)`
   - `setFoodAt(pos, amt)`
   - `setBugAt(pos, bug)`
   - `cellAt(pos)`
   - `getFoodAt(pos)`
   - `getBugAt(pos)`
   - `removeBugAt(pos)`
8. Partially implemented `Bug` class:
   - Constructor
   - `getPosition()`
   - `toString()`
9. Created `Assembler` class with a stub `assemble(file)` function
10. Implemented `BugBrain` class
    - Constructor
    - `getNextInstruction`
11. Partially implemented `GUI` class
    - Constructor
    - `setIterationsNumber(num)`
    - `setOptions(bool)`
    - `getIterationsNumber()`
12. Implemented `Simulator` classes constructor
13. Implemented file upload and ability to file parse (all on client-side)
14. Partially implemented parsing of world map file (`.world` file)

    - Checks for closed border
    - Checks that both swarms are present
    - Checks for valid characters
    - Checks for valid dimensions
    - Checks for valid map file length that corresponds to given dimensions

15. Implemented creation of map on the web page using a `World` object created after parsing the world map file (each cell is uniquely colored based on the cell type)
16. Documentation / Comments for each function implemented
17. Added test cases for:
    - `parseMapFile(mapFile)` (location: `pair17_sprint1/scripts/ParseWorldMap.js`)
    - Methods in `WorldCell.js` (location: `pair17_sprint1/scripts/game_logic/WorldCell.js`)
    - Methods in`Bug.js` (location: `pair17_sprint1/scripts/game_logic/Bug.js`)
    - Methods in `Position.js` (location: `pair17_sprint1/scripts/game_logic/Position.js`)
18. Added type checking for various methods in:
    - `World.js`
    - `WorldCell.js`
    - `Position.js`
    - `Bug.js`
    - `BugBrain.js`
19. Created files for all classes in UML diagram.

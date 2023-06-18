// import { parseMapFile } from "../scripts/ParseWorldMap.js";

// describe("parseMapFile", () => {
//   test("Missing Swarm", () => {
//     let mapFile = ["10", "10", "##########", "#99....33#", "#9#......#", "#.#......#", "#..5.....#", "#+++++5..#", "#++++++#.#", "#+++++.#9#", "#33....99#", "##########"];
//     expect(() => parseMapFile(mapFile)).toThrow("At least one bug swarm is missing");
//   });

//   test("Map File length not correspond with given dimensions", () => {
//     let mapFile = ["10", "11", "##########", "#99....33#", "#9#......#", "#.#......#", "#..5.....#", "#+++++5..#", "#++++++#.#", "#+++++.#9#", "#33....99#", "##########"];
//     expect(() => parseMapFile(mapFile)).toThrow("Invalid length of map.");
//   });

//   test("Border does not close", () => {
//     let mapFile = ["10", "10", "##########", "#99....33#", "#9#......#", "#.#......#", "#..5.....#", "#+++++5..#", "#++++++#.#", "#+++++.#9#", "#33....99.", "##########"];
//     expect(() => parseMapFile(mapFile)).toThrow("Invalid characters or length of line or border does not close");
//   });

//   test("Invalid character", () => {
//     let mapFile = ["10", "10", "##########", "#a9....33#", "#9#......#", "#.#......#", "#..5.....#", "#+++++5..#", "#++++++#.#", "#+++++.#9#", "#33....99.", "##########"];
//     expect(() => parseMapFile(mapFile)).toThrow("Invalid characters or length of line or border does not close");
//   });
// });

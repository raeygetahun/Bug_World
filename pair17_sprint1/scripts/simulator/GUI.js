class GUI {
  constructor(activatingLogOutput, iterations) {
    this.activatingLogOutput = activatingLogOutput;
    this.iterations = iterations;
  }

  updateMap() {}

  setIterationsNumber(num) {
    this.iterations = num;
  }

  setUseMapFile(file) {}

  setOptions(bool) {
    this.activatingLogOutput = true;
  }

  getIterationsNumber() {
    return this.iterations;
  }
}

export { GUI };

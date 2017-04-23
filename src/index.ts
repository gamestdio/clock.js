class Clock {

  public running: boolean = false;

  public deltaTime: number;
  public currentTime: number;
  public elapsedTime: number;

  protected now: Function = (typeof(window) !== "undefined" && window.performance && (window.performance.now).bind(window.performance)) || Date.now;
  protected _interval;

  constructor (useInterval: boolean = false) {
    this.start(useInterval);
  }

  start (useInterval: boolean = false) {
    this.deltaTime = 0;
    this.currentTime = this.now();
    this.elapsedTime = 0;
    this.running = true;

    if (useInterval) {
      // auto set interval to 60 ticks per second
      this._interval = setInterval(this.tick.bind(this), 1000 / 60);
    }
  }

  stop () {
    this.running = false;

    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  tick (newTime = this.now()) {
    this.deltaTime = newTime - this.currentTime;
    this.currentTime = newTime;
    this.elapsedTime += this.deltaTime;
  }

}

export = Clock

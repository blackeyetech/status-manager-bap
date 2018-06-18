"use strict";

class StatusManagerBap extends besh.Bap {
  constructor(name) {
    super(name);

    this.log.info("Initialised");
  }

  async start() {
    this.log.info("Started!");
  }

  async stop() {
    this.log.info("Stopped!");
  }

  async get() {
    let status = [];
    let bapList = besh.getBapList();

    bapList.forEach((bap) => {
      status.push(bap.status());
    });

    let results = await Promise.all(status);
    let healthy = true;

    results.forEach((status) => {
      if (status.unhealthy()) {
        healthy = false;
        this.log.warn(`Status unhealthy for (${status.name}): %j`, status);
      }
    });

    return { results, healthy };
  }  
}

// Use the same version as besh
StatusManagerBap.version = besh.version;

module.exports = StatusManagerBap;



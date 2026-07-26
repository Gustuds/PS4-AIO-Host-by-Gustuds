importScripts("misc.js");

let marker_arr = new Uint32Array(new ArrayBuffer(0x10));

const transfer = [];
const api = {
  init(name) {

    logger.debug("worker: init entered");

    self.name = name;

    logger.debug("worker: self.name OK");

    version.init();

    logger.debug("worker: version.init OK");

    switch (version.console) {

        case 4:

            logger.debug("worker: importScripts begin");

            importScripts("ps4/constants.js", "ps4/userland.js");

            logger.debug("worker: importScripts OK");

            break;

        case 5:

            break;

        default:

            throw new Error(`Unsupported console ${version.console}`);
    }

    logger.debug("worker: creating arw.master");

    arw.master = new Uint32Array(6);

    logger.debug("worker: marker.fill");

    marker_arr.fill(0x41414141);

    logger.debug("worker: marker.leak");

    marker_arr.leak = arw.leak;

    logger.debug("worker: marker.master");

    marker_arr.master = arw.master;

    logger.debug("worker: marker.victim");

    marker_arr.victim = arw.victim;

    logger.debug("worker: transfer.push");

    transfer.push(marker_arr.buffer);

    logger.debug("worker: returning");

    return marker_arr;
},
};

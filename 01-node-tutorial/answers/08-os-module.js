const os = require("os");

const cpuModel = os.cpus()[0].model;
console.log("My CPU model:", cpuModel);

const currentOS = {
    name: os.type(),
    release: os.release(),
    version: os.version(),
    platform: os.platform(),
    hostName: os.hostname(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
};

console.log('Information about my OS:');
console.log(currentOS);

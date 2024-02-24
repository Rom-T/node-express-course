const path = require('path');

console.log(path.sep)

const pathFile = path.join('/content', 'subfolder', 'test.txt');
console.log(pathFile);

const base = path.basename(pathFile);
console.log(base);

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log(absolute);

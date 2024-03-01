const { readFileSync, writeFileSync }  = require('fs');

const first = readFileSync('../content/first.txt', 'utf8');
const second = readFileSync('../content/second.txt', 'utf8');
const message = 'Here is the result :';

writeFileSync(
    './temporary/fileA.txt',
    `${message} \n${first}, \n${second}`,
    { flag: 'a' }
);

const resultSync = readFileSync('./temporary/fileA.txt', 'utf-8');
console.log(resultSync);
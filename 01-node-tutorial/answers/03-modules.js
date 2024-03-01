const names = require("./04-names.js");
const introduce = require("./05-utils.js");
const alternative_flavor = require("./06-alternative-flavor.js");
require("./07-mind-grenade.js");

console.log(names);
console.log(names.albert);
introduce('Roman');
introduce(names.julia);

console.log(alternative_flavor);
console.log(alternative_flavor.os);
console.log(alternative_flavor.shop);

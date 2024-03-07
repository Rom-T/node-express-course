const EventEmitter = require("events");


const emitter = new EventEmitter();

emitter.on('calculate', response => {
    console.log(response);
});

function calculate(firstNumber, secondNumber, operator) {
    let result;
    let sign = ['+', '-', '*', '/'];
    if (sign.includes(operator)) {
        result = eval(firstNumber + operator + secondNumber);
        emitter.emit("calculate", `Calculated value is ${result}`);
    } else {
        emitter.emit("calculate", 'Invalid operator');
    }
}

calculate(4, 4, '/');

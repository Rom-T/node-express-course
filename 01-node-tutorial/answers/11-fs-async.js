const { writeFile, readFile } = require("fs");

const message = 'Here is the result :';

console.log("at start");
writeFile("./temporary/fileB.txt", `${message}\n`, (err) => {
    console.log("step 1");
    if (err) {
        console.log("This error happened: ", err);
    }
    console.log("Line 1 written successfully");

    readFile('../content/first.txt', 'utf8', (err, result) => {
        console.log("step 2");
        if (err) {
            console.log("This error happened: ", err);
        }
        const first = result;
        console.log("Line 2 read successfully");

        readFile('../content/second.txt', 'utf8', (err, result) => {
            console.log("step 3");
            if (err) {
                console.log("This error happened: ", err);
            }
            const second = result;
            console.log("Line 3 read successfully");

            writeFile('./temporary/fileB.txt', `${first}\n`, { flag: 'a' }, (err) => {
                console.log("step 4");
                if (err) {
                    console.log("This error happened: ", err);
                }
                console.log("Line 2 written successfully");

                writeFile('./temporary/fileB.txt', `${second}\n`, { flag: 'a' }, (err) => {
                    console.log("step 5");
                    if (err) {
                        console.log("This error happened: ", err);
                    }
                    console.log("Line 3 written successfully");
                    console.log("at end");
                });
            });
        });
    });
});

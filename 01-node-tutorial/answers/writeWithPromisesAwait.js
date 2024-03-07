const { writeFile, readFile } = require("fs").promises;


const writer = async () => {
    try {
        const first = "This is first text line";
        const second = "This is second text line";
        const third = "This is third text line";

        await writeFile("temp.txt", `${first}\n${second}\n${third}`);
        console.log("File written successfully!");
    } catch (error) {
        console.log("This error happened: ", error);
    }
};

const reader = async () => {
    try {
        const fileData = await readFile("temp.txt", "utf8");
        console.log("File content:\n", fileData);
    } catch (error) {
        console.log("This error happened: ", error);
    }
};

const readWrite = async () => {
    await writer();
    await reader();
};

readWrite();

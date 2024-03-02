const { writeFile, readFile } = require("fs").promises;

console.log("at start");
writeFile("temp.txt", "This is first text line\n")
  .then(() => {
    console.log("Line 1 written successfully");
    return writeFile("temp.txt", "This is second text line\n", { flag: "a" });
  })
  .then(() => {
    console.log("Line 2 written successfully");
    return writeFile("temp.txt", "This is third text line", { flag: "a" });
  })
  .then(() => {
    console.log("Line 3 written successfully");
    return readFile("temp.txt", 'utf-8')
  })
  .then((fileData) => {
    console.log("File content:\n", fileData);
    console.log("at end");
  })
  .catch((error) => {
    console.log("This error happened: ", error);
  });
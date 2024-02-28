const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let name = "Enter your name.";
let backgroundColor = "#ffffff";
let prevName = "Enter your name.";
let nameParagraphColor = "";
let prevNameTemp = "";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body style="background-color: ${backgroundColor};">
  <p>${name}</p>
  <form method="POST">
  <input name="name"></input>
  <button type="submit">Submit</button>
  <div>
  <p>${nameParagraphColor}What color do you want to see as a background?</p>
  <select name="color" onchange="this.form.submit();">
  <option value="">Select Color</option>
  <option style="color:#ff0000;" value="#ff0000">&#9724; Red</option>
  <option style="color:#ffff00;" value="#ffff00">&#9724; Yellow</option>
  <option style="color:#0000ff;" value="#0000ff">&#9724; Blue</option>
  <option style="color:#00ff00;" value="#00ff00">&#9724; Green</option>
  <option style="color:#ffc0cb;" value="#ffc0cb">&#9724; Pink</option>
  <option style="color:#a020f0;" value="#a020f0">&#9724; Purple</option>
  </select>
  </div>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["name"]) {
        name = `Hello ${body["name"]}! `;
        prevName = name;
        nameParagraphColor = name;
        prevNameTemp = name;
      } else {
        name = "Nothing was entered.";
        nameParagraphColor = '';
      }
      if (body["color"] && body["name"] == "") {
        backgroundColor = body["color"].replace('%23', '#');
        name = prevName;
        nameParagraphColor = prevNameTemp;
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");

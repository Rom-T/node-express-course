const express = require('express');
const cookieParser = require('cookie-parser');
const peopleRouter = require('./routes/people');
const app = express();

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toLocaleTimeString();
  console.log(method, url, time);
  next();
};

const auth = (req, res, next) => {
  if (!req.cookies.name) {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized' });
  }
  req.user = req.cookies.name;
  next();
};

app.use(express.static('./methods-public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger);
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Home');
});

app.use('/api/people', peopleRouter);

app.post("/logon", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }
  res.cookie("name", name);
  res.status(201).json({ success: true, message: `Hello ${name}!` });
});

app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ success: true, message: "The user is logged off" });
});

app.get("/test", auth, (req, res) => {
  const { user } = req;
  res.status(200).json({ success: true, message: `Welcome ${user}` });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

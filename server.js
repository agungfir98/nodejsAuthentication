const { json } = require("express");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const PORT = 5000;

const users = [];

app.use(express.json());
app.get("/users", (req, res) => {
  res.json(users);
});
app.post("/users", async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // console.log(salt);
    console.log(hashedPassword);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (err) {
    console.log(err);
  }
});

app.post("/users/login", async (req, res) => {
  const pengguna = users.find((users) => users.name === req.body.name);
  if (pengguna == null) {
    return res.status(400).send("Can't find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, pengguna.password)) {
      return res.status(200).send("success");
    } else {
      return res.status(400).send("wrong password");
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, console.log("server berjalan pada PORT" + PORT));

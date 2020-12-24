import express from "express";
import jwt from "jsonwebtoken";
const app = express();

app.use(express.json);

const post = [
  {
    username: "akash",
    title: "post1",
  },
  {
    username: "arjun",
    title: "post2",
  },
  {
    username: "vishnu",
    title: "post3",
  },
  {
    username: "justin",
    title: "post4",
  },
];

app.get("/posts", (req, res) => {
  console.log("testing");
});

app.post("/login", (req, res) => {
  // Authentication
  const username = req.body.username;
  const uesr = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRED);
  res.json({ accessToken });
});

app.listen(3000);

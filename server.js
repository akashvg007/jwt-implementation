import express from "express";
import {
  login,
  authenticateToken,
  fetchPost,
  getToken,
} from "./Authenticate.js";

const app = express();
const { PORT_ADD = 4000 } = process.env;

app.use(express.json());

app.get("/posts", authenticateToken, (req, res) => {
  fetchPost(req, res);
});

app.post("/token", (req, res) => {
  getToken(req, res);
});

app.post("/login", (req, res) => {
  login(req, res);
});

app.listen(PORT_ADD, (err) => {
  if (err) console.log("something went wrong ", err);
  console.log(`port listening on ${PORT_ADD}`);
});

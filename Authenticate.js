import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const { ACCESS_TOKEN_SECRED, REFRESH_TOKEN } = process.env;

const posts = [
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

const refreshTokens = [];

export const fetchPost = (req, res) => {
  res.send(posts.filter((post) => post.username === req.user.name));
};

export const getToken = (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
};

export const generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRED, { expiresIn: "35s" });
};

export const login = (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, REFRESH_TOKEN);
  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, ACCESS_TOKEN_SECRED, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

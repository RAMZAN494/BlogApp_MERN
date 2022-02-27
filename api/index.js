const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
require("./models/db");

const AuthRoute = require("./routes/auth");
const UserRoute = require("./routes/users");
const PostRoute = require("./routes/posts");
const CategoryRoute = require("./routes/categories");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ msg: "File has been uploaded" });
});

app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/posts", PostRoute);
app.use("/api/categories", CategoryRoute);

app.get("/", (req, res) => {
  res.json({ msg: "Hello How Are You" });
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server Started On Port ${port}`);
});

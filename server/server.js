require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./connectDb");
const PostModel = require("./PostModel");
const cors = require("cors");
connectDb();
app.use(express.json());
app.use(cors());

app.get("/api/post", async (req, res) => {
  try {
    const posts = await PostModel.find();
    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

app.post("/api/post", async (req, res) => {
  try {
    const { text } = req.body;
    const newPost = await new PostModel({ text }).save();

    return res.json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

app.listen(5000, () => console.log("Server Running"));

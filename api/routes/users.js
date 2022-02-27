const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

const router = express.Router();

//GET USER
router.get("/", async (req, res) => {
  const user = await User.find({});
  res.status(200).json(user);
});

//UPDATE USER

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  } else {
    res.status(401).json({ msg: "You can update only your account" });
  }
});

//DELETE USER

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        // await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "User has been deleted" });
      } catch (err) {
        res.status(400).json({ msg: err.message });
      }
    } catch (err) {
      res.status(404).json({ msg: "User not found" });
    }
  } else {
    res.status(401).json({ msg: "You can update only your account" });
  }
});

// GET USERS

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(400).json({ msg: err.meaasege });
  }
});

module.exports = router;

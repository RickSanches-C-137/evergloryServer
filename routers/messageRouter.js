const router = require("express").Router();
const auth = require("../middleware/auth");
const { validateRequest } = require("../middleware/validate");
const { param } = require("express-validator");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {

    const { name, message, } = req.body;

    const newMessage = new Message({
      name, 
      message,
      
    });

    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tr = await Message.findById(req.params.id);
    await tr.updateOne({ $set: req.body });
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json("error");
  }
});

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get(
  "/:id",
  param("id").isMongoId().withMessage("Please enter a valid Parcel ID"),
  validateRequest,
  async (req, res) => {
    try {
      const post = await Parcel.findById(req.params.id);

      if (!post) return res.status(404).json("Parcel not found");

      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;

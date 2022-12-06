const router = require("express").Router();
const auth = require("../middleware/auth");
const { validateRequest } = require("../middleware/validate");
const { param } = require("express-validator");
const Parcel = require("../models/parcelModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
  
    const { item, from, to, sender, reciever, currentLocation,  date, time, status } = req.body;

    const newParcel = new Parcel({
      item,
      from,
      to,
      sender,
      reciever,
      currentLocation,
      date,
      time,
      status
    });

    const savedParcel = await newParcel.save();

    res.json(savedParcel);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    await parcel.updateOne({ $set: req.body });
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json("error");
  }
});

router.get("/", async (req, res) => {
  try {
    const parcels = await Parcel.find();
    res.json(parcels);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/user", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);
    const decodedUser = await jwt.decode(token);
    const user = await User.findById(decodedUser.user);
    const parcels = await Parcel.find({userId: user._id});
    res.json(parcels);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//Get a Parcel
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Please enter a valid Parcel ID"),
  validateRequest,
  async (req, res) => {
    try {
      const parcel = await Parcel.findById(req.params.id);

      if (!parcel) return res.status(404).json("Parcel not found");

      res.status(200).json(parcel);
    } catch (err) {
     
      res.status(500).json(err);
    }
  }
);

module.exports = router;

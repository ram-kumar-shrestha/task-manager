const { findByIdAndDelete } = require("../model/user");
const User = require("../model/user");

const router = require("express").Router();

const auth = require("../middlerware/auth");

// Create a user
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.json({ user, token });
    // res.json({ user, token });
  } catch (error) {
    res.status(400).json(error);
  }
});

// logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();
    res.json();
  } catch (error) {
    res.status(500).json(error);
  }
});

// Read all users
router.get("/users", auth, async (req, res) => {
  // router code here
  try {
    const users = await User.find({});
    // console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Read a User
router.get("/users/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update a User
router.patch("/users/me", auth, async (req, res) => {
  const allowedUpdatedKeys = ["name", "password", "email"];
  const reqKeys = Object.keys(req.body);

  const isValidUpdate = reqKeys.every((key) =>
    allowedUpdatedKeys.includes(key)
  );

  if (!isValidUpdate) return res.status(400).json({ msg: "Invalid Update " });

  try {
    reqKeys.forEach((update) => (req.user[update] = req.body[update]));

    await req.user.save();

    res.json(req.user);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.josn(req.user);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;

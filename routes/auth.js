const router = require('express').Router();

const User = require('../models/Users');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      dateOfBirth: req.body.dateOfBirth,
    });
    const user = await newUser.save();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(400).json('wrong credetials');
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json('wrong credentials');
    }
    const { password, ...others } = user._doc;
    console.log(others);
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

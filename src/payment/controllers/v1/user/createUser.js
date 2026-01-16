import User from "../../../../models/User.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    console.log("Creating user with data:", req.body);
    const user = new User({ name, age });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

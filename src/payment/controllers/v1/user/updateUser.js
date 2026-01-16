import User from "../../../../models/User.js";

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, age },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

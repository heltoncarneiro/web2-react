const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = a = require("jsonwebtoken");

const JWT_SECRET = "your_secret_key"; // TODO: Move to .env file

const authController = {
    register: async (req, res) => {
        try {
            console.log("Registering user with email:", req.body.email);
            const { email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                console.log("User already exists");
                return res.status(400).json({ msg: "User already exists." });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                email,
                password: hashedPassword,
            });

            await newUser.save();

            console.log("User registered successfully");
            res.status(201).json({ msg: "User registered successfully." });
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ msg: "Server error." });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "Invalid credentials." });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials." });
            }

            const token = jwt.sign({ id: user._id }, JWT_SECRET, {
                expiresIn: "1h",
            });

            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Server error." });
        }
    },
};

module.exports = authController;

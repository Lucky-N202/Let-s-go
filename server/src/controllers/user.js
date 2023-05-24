const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
  try {
    // Get user input from request body
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400)
        .json({ message: 'User already exists' });
         }
     
         // Hash the password
         const hashedPassword = await bcrypt.hash(password, 10);
     
         // Create a new user
         const newUser = new User({ name, email, password: hashedPassword });
         await newUser.save();
     
         // Return success message
         res.status(201).json({ message: 'User registered successfully' });
       } catch (error) {
         res.status(500).json({ message: 'Internal server error' });
       }
     };

     // User login
     exports.login = async (req, res) => {
        try {
          // Get user input from request body
          const { email, password } = req.body;
      
          // Find the user in the database
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Validate the password
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
          }
      
          // Generate a JWT token
          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      
          // Return the token
          res.status(200).json({ token });
        } catch (error) {
          res.status(500).json({ message: 'Internal server error' });
        }
      };
      
      // Get user profile
      exports.getProfile = async (req, res) => {
        try {
          // Get the authenticated user from the request object
          const { userId } = req;
      
          // Find the user in the database
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // Return the user profile
          res.status(200).json({ user });
        } catch (error) {
          res.status(500).json({ message: 'Internal server error' });
        }
      };


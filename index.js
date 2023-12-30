const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/register-form', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define a User schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

// Handle form submission
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });

  // Save the user to MongoDB
  newUser.save((err, user) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/registration.html');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

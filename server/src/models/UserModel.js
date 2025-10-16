const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,}$/;
        return passwordRegex.test(password);
      },
      message:
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one special character, and cannot contain spaces',
    },
  },
  preference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Preference'
  },
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vote',
    },
  ],
},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
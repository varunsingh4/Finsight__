const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  income: { type: Number, required: true },
  riskProfile: {
    type: String,
    enum: ['Conservative', 'Balanced', 'Aggressive'],
    default: 'Conservative'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

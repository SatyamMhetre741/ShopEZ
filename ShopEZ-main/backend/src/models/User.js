// Assigned to: Satyam
const mongoose = require('mongoose');

// TODO: Define User schema
// Fields: name, email, password, role, avatar, createdAt

const UserSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

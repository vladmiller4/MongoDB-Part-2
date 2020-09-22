const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({});

module.exports = mongoose.model('User', ProductSchema);
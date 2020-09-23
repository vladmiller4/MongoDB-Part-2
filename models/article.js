const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {type: String, minLength: 5, maxlength: 400, required: true, index: 'text'},
  subtitle: {type: String, minlength: 5},
  description: {type: String, minlength: 5, maxlength: 5000, required: true},
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  category: {type: String, enum: ['sport', 'games', 'history'], required: true}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false });

module.exports = mongoose.model('Article', ArticleSchema);
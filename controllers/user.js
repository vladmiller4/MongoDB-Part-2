module.exports = { createUser, updateUser, getUser, deleteUser, getUserArticles };

const User = require('../models/user');
const Article = require('../models/article');

async function createUser(req, res) {
  try {
    const user = await new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    if(e.name == 'ValidationError'){
      res.status(400).send(e.message);
    } else {
      res.status(500).send(e.message);
    }
  }
}

async function updateUser(req, res) {
  try {
    const {userId} = req.params;
    await User.findOneAndUpdate({_id: userId}, {$set: {...req.body}});
    res.status(200).send(`User - ID: ${userId} -  was successfully updated!`);
  } catch (e) {
    if(e.name == 'ValidationError'){
      res.status(400).send(e.message);
    } else {
      res.status(500).send(e.message);
    }
  }
}

async function getUser(req, res) {
  try {
    const {userId} = req.params;
    const user = await User.findOne({_id: userId});
    if(!user){
      res.status(400).send('There is no user with such id!');
    } else {
      const articles = await Article.find({owner: userId});
      res.status(200).send({user, articles});
    }
  } catch (e) {
      res.status(500).send(e.message);
  }
}

async function deleteUser(req, res) {
  try {
    const {userId} = req.params;
    const result = await User.deleteOne({_id: userId});
    if (result.n == '0'){
      res.status(400).send('There is no user with such id!');
    } else {
      await Article.deleteMany({owner: userId});
      res.status(200).send('User was deleted with all his articles!');
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function getUserArticles(req, res) {
  try {
    const {userId} = req.params;
    const user = await User.findOne({_id: userId});
    if(!user){
      res.status(400).send('There is no user with such id!');
    } else {
      const articles = await Article.find({owner: userId});
      res.status(200).send({articles});
    }
  } catch (e) {
      res.status(500).send(e.message);
  }
}
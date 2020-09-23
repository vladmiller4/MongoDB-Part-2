module.exports = {createArticle, updateArticle, getArticles, deleteArticle};

const User = require('../models/user');
const Article = require('../models/article');

async function createArticle(req, res) {
  try {
    const {owner} = req.body;
    const user = await User.findOne({_id: owner});
    if(!user){
        res.status(400).send('There is no user with such id!');
    } else {
        const article = await new Article(req.body);
        await article.save();
        await User.findOneAndUpdate({_id: owner}, {$inc: {numberOfArticles: 1}});
        res.status(201).send(article);
    }
} catch (e) {
    if(e.name == 'ValidationError'){
        res.status(400).send(e.message);
      } else {
        res.status(500).send(e.message);
    }
  }
}

async function updateArticle(req, res) {
  try {
    const {articleId} = req.params;
    const article = await Article.find({_id: articleId});
    if(!article){
      res.status(400).send('There is no article with such id!');
    } else {
      const {owner} = article;
      const user = await User.find({_id: owner});
      if(!user){
          res.status(400).send('There is no user with such id!');
      } else {
          await Article.findOneAndUpdate({_id: articleId}, {$set: {...req.body}});
          res.status(200).send(`Article - ID: ${articleId} -  was successfully updated!`);
      }
    }
} catch (e){
    if(e.name == 'ValidationError'){
        res.status(400).send(e.message);
      } else {
        res.status(500).send(e.message);
    }
  }
}

async function getArticles(req, res) {
  try {
    const filter = ["title","subtitle","description","owner","category","createdAt","updatedAt"];
    const query = filter.reduce((accumulator, value) => {
        if(req.query[value]){
            accumulator[value] = req.query[value];
        }
        return accumulator;
      }, {});
    const articles = await Article.find(query).populate('owner', ['firstName', 'lastName']);
    res.status(200).send(articles);
} catch (e) {
    if(e.name == 'ValidationError'){
        res.status(400).send(e.message);
      } else {
        res.status(500).send(e.message);
    }
  }
}

async function deleteArticle(req, res) {
    try {
        const {articleId} = req.params;
        const article = await Article.findOne({_id: articleId});
        if(!article){
          res.status(400).send('There is no article with such id!');
        } else {
          const {owner} = article;
          const user = await User.findOne({_id: owner});
          if(!user){
              res.status(400).send('There is no user with such id!');
          } else {
              await User.findOneAndUpdate({_id: owner}, {$inc: {numberOfArticles: -1}});
              await Article.findOneAndDelete({_id: articleId});
              res.status(200).send(`Article - ID: ${articleId} -  was successfully deleted!`);
          }
        }
    } catch (e){
        if(e.name == 'ValidationError') {
            res.status(400).send(e.message);
        } else {
            res.status(500).send(e.message);
        }
    }
}
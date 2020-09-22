module.exports = {createUser};

function createUser(req, res, next) {
  return res.json({work: true});
}
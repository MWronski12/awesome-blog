const db = require("../models");
const Post = db.post;

const checkCreatePostParameters = (req, res, next) => {
  if (
    req.body.title == null ||
    req.body.content == null ||
    req.body.userId == null
  ) {
    res.status(400).send({ message: "Failed! Invalid request parameters!" });
    return;
  }
  next();
};

const checkGetPostParameters = (req, res, next) => {
  if (req.params.id == null) {
    res.status(400).send({ message: "Failed! Invalid request parameters!" });
    return;
  }
  next();
};

const verifyPost = {
  checkCreatePostParameters: checkCreatePostParameters,
  checkGetPostParameters: checkGetPostParameters,
};

module.exports = verifyPost;

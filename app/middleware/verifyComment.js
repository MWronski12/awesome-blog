const db = require("../models");
const Post = db.post;

const checkCreateCommentParameters = (req, res, next) => {
  if (
    req.body.content == null ||
    req.body.postId == null ||
    req.body.userId == null
  ) {
    res.status(400).send({ message: "Failed! Invalid request parameters!" });
    return;
  }
  next();
};

const verifyComment = {
  checkCreateCommentParameters: checkCreateCommentParameters,
};

module.exports = verifyComment;

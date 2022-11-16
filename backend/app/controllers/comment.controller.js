const db = require("../models");
const User = db.user;
const Post = db.post;
const Comment = db.comment;

exports.createComment = (req, res) => {
  Comment.create({
    content: req.body.content,
    postId: req.body.postId,
    userId: req.body.userId,
  })
    .then((comment) => {
      res.header("Location", `/api/comments/${comment.id}`);
      res.status(201).send({ message: "Comment was successfully created!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getComment = (req, res) => {
  Comment.findByPk(req.params.id)
    .then((comment) => {
      if (comment == null) {
        res.status(404).send({ message: "Failed! comment does not exist!" });
      } else {
        res.status(200).send(comment);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

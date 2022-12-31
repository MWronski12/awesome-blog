const db = require("../models");
const Post = db.post;

exports.getAllPosts = (req, res) => {
  Post.findAll()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getPost = (req, res) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      if (post == null) {
        res.status(404).send({ message: "Failed! Post does not exist!" });
      } else {
        res.status(200).send(post);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getPostComments = (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => post.getComments())
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.createPost = (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  })
    .then((post) => {
      res.header("Location", `/api/posts/${post.id}`);
      res
        .status(201)
        .send({ message: "Post was successfully created!", postId: post.id });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deletePost = (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(201).send())
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

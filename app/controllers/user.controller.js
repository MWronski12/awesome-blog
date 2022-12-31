const db = require("../models");
const User = db.user;

exports.getUserName = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.status(200).send({ username: user.username });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();

const corsOptions = {
  origin: "https://mwronski12.github.io/my-awesome-blog/",
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

// setup roles
const User = require("./app/models").user;
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

  // create admin user
  User.create({
    username: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin", 8),
  })
    .then((user) => {
      user.setRoles([3]);
    })
    .catch((err) => console.log(err.message));

  // create normal user
  User.create({
    username: "user",
    email: "user@gmail.com",
    password: bcrypt.hashSync("user", 8),
  })
    .then((user) => {
      user.setRoles([1]);
    })
    .catch((err) => console.log(err.message));
}

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/comment.routes")(app);

// app
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

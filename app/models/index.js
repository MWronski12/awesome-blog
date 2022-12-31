const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: config.DIALECT,
  storage: config.STORAGE,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.post = require("../models/post.model.js")(sequelize, Sequelize);
db.comment = require("../models/comment.model.js")(sequelize, Sequelize);

// user-role many-to-many relation
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

// user-post one-to-many relation
db.post.belongsTo(db.user);
db.user.hasMany(db.post);

// user-comment one-to-many relation
db.comment.belongsTo(db.user);
db.user.hasMany(db.comment);

// post-comment one-to-many relation
db.comment.belongsTo(db.post);
db.post.hasMany(db.comment);

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;

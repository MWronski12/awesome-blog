module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comments", {
    content: {
      type: Sequelize.TEXT,
    },
    postId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
  });
  return Comment;
};

const controller = require("../controllers/comment.controller");
const { authJwt, verifyComment } = require("../middleware");

module.exports = function (app) {
  app.post(
    "/api/comments",
    [authJwt.verifyToken, verifyComment.checkCreateCommentParameters],
    controller.createComment
  );

  app.get("/api/comments/:id", controller.getComment);

  app.delete("/api/comments/:id", [
    authJwt.verifyToken,
    authJwt.isModeratorOrAdmin,
  ]);
};

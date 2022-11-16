const controller = require("../controllers/post.controller");
const { verifyPost, authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/posts", controller.getAllPosts);

  app.post(
    "/api/posts",
    [
      authJwt.verifyToken,
      authJwt.isModeratorOrAdmin,
      verifyPost.checkCreatePostParameters,
    ],
    controller.createPost
  );

  app.get(
    "/api/posts/:id",
    [verifyPost.checkGetPostParameters],
    controller.getPost
  );

  app.delete(
    "/api/posts/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.deletePost
  );

  app.get("/api/posts/:id/comments", controller.getPostComments);
};

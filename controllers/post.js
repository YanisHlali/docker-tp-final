const path = require("path");
const postModel = require("../models/post.js");

async function createPost(req, res) {
  if (req.method === "POST") {
    const { content } = req.body;

    if (
      content.includes("SELECT") ||
      content.includes("INSERT") ||
      content.includes("UPDATE") ||
      content.includes("DELETE")
    ) {
      res.render("create", {
        error: "Votre message contient des caractères interdits",
      });
      return;
    }

    let image_path = "";

    if (req.files && req.files.length > 0) {
        const extension = path.extname(req.files[0].originalname);
        image_path = `images/${req.generatedFileName}${extension}`;
    }

    const poster_ip = req.headers["x-forwarded-for"]
      ? req.headers["x-forwarded-for"].split(",")[0]
      : req.connection.remoteAddress;

    try {
      if (req.session.userId) {
        await postModel.createPostWithUserId(
          content,
          image_path,
          poster_ip,
          req.session.userId
        );
        res.redirect("/");
        return;
      }
      const rows = await postModel.createPost(content, image_path, poster_ip);
      if (rows.affectedRows === 1) {
        res.redirect("/");
      } else {
        res.render("create", { error: "Une erreur est survenue" });
      }
    } catch (error) {
      console.error(error);
      res.render("create", {
        error: "Une erreur est survenue lors de la création du post",
      });
    }
  }
}

async function getAllPosts(req, res) {
  const posts = await postModel.getAllPosts();
  res.render("index", { posts });
}

module.exports = {
  createPost,
  getAllPosts,
};

const router = require("express").Router();
const { Post, User, Comment } = require('../models');
const withAuth = require("../utils/auth");

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: User, as: 'user'}, { model: Comment, as: 'comments'}],
        });
        console.log(posts);
        res.render('homepage', { posts: posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        const post = postData.get({ plain: true });
        console.log(post);

        res.render("post", {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
        res.redirect("/login");
    }
});

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        console.log("Dashboard route accessed");
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        
        include: [
          {
            model: Post,
            include: [User],
          },
          {
            model: Comment,
          },
        ],
      });
      const user = userData.get({ plain: true });
      console.log(user)
  
      res.render("dashboard", {
        ...user,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/create", async (req, res) => {
    try {
      if (req.session.logged_in) {
        res.render("create", {
          logged_in: req.session.logged_in,
          userId: req.session.user_id,
        });
        return;
      } else {
        res.redirect("/login");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
module.exports = router;

const router = require("express").Router();
const { Post, User, Comment } = require('../models');

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

module.exports = router;

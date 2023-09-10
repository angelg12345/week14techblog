
const { Post, User, Comment } = require("../models");
const router = require("express").Router();

const postController = {
    async getAllPosts(req, res) {
        try {
            const posts = await Post.findAll({
                include: [
                    { model: User, as: 'user'},
                    { model: Comment, as: 'comments'},
                ],
            });
            res.render('homepage', { posts });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'});
        }
    },

    async getPostByID(req, res) {
        try {
            const postData = await Post.findByPk(req.params.id, {
                include: [
                    { model: User, attributes: ["name"] },
                    { model: Comment, include: [User] },
                ],
            });
            
            if (!postData) {
                res.status(404).json({ message: 'post not found' });
                return;
            }

            const post = postData.get({ plain: true });

            res.render( "post", {
                post,
                logged_in: req.session.logged_in,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async createPost(req, res) {
        try {
            const newPost = await Post.create({
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user_id, 
            });

            res.json(newPost);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async updatePost(req, res) {
        try {
            const updatedPost = await Post.update({
                title: req.body.title,
                content: req.body.content,
            }, {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id, 
                },
            });

            if (updatedPost[0] === 0) {
                res.status(404).json({ message: 'Post not found or unauthorized' });
                return;
            }

            res.json({ message: 'Post updated successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async deletePost(req, res) {
        try {
            const deletedPostCount = await Post.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id, 
                },
            });

            if (deletedPostCount === 0) {
                res.status(404).json({ message: 'Post not found or unauthorized' });
                return;
            }

            res.json({ message: 'Post deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
module.exports= postController
module.exports = router;

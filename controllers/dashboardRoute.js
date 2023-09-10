const express = require('express');
const router = express.Router();
const {Post} = require('../models');

router.get('/dashboard', async (req, res) => {
    try {
        const user_id = req.session.user_id;

        const userPost = await Post.findAll({
            where: {
                user_id
            }
        });

        res.render('dashboard', {
            userPost,
            logged_in: req.session.logged_in
        });
    } catch (error){
        console.error(error);
        res.status(500).json({ message: 'Internal server Error'});
    }
}) ;

module.exports = router;


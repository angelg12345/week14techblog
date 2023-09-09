const router = require("express").Router();
const { User } = require("../models")

const userController = {
    async signUp(req, res) {
        try {
            const newUser = await User.create({
                username: req.body.username,
                password: req.body.password,
            });

            req.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.logged_in = true;
                res.json(newUser);
            });
        
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async logIn(req, res) {
        try {
            const userData = await User.findOne({ where: { username: req.body.username } });

            if(!userData) {
                res.status(400).json({ message: 'Incorrect username or password. Please try again. '});
                return;
            }
            const validPassword = await userData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect username or password. Please try again.'})
                return;
            }

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
                res.json({ user: userData, message: 'You are now logged in'});
            });
        } catch (err) {
            res.status(500).json(err);
              
        }
    },

    logOut(req, res) {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    }
};

module.exports = userController;
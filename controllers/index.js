const express = require('express');
const router = express.Router();

// Import controllers
const UserController = require('./UserController');
const PostController = require('./PostController');
const CommentController = require('./CommentController');

// User routes
router.post('/users', UserController.createUser);


// Post routes
router.post('/posts', PostController.createPost);
router.get('/posts', PostController.getPosts);


// Comment routes
router.post('/posts/:postID/comments', CommentController.createComment);


module.exports = router;

const express = require('express');
const router = express.Router();

// Import controllers
const CommentsRoutes = require('./CommentsRoutes');
const DashboardRoutes = require('./dashboardRoute');
const HomeRoutes = require('./homeRoutes');
const PostController = require('./Post');
const UserController = require('./UserController');

// Comment routes
router.use('/comments', CommentsRoutes);

// Dashboard routes
router.use('/dashboard', DashboardRoutes);

// Home routes
router.use('/', HomeRoutes);

// Post routes
router.use('/posts', PostController);

// User routes
router.use('/users', UserController);

module.exports = router;

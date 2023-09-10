const express = require('express');
const router = express.Router();
const { Comment } = require("../models");

const commentController = {
    async createComment(req, res) {
        try {
            const newComment = await Comment.create({
                content: req.body.content,
                userId: req.session.user_Id,
                postId: req.params.post_Id, 
            });
            res.status(201).json(newComment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async updateComment(req, res) {
        try {
            const updatedComment = await Comment.update(
                { content: req.body.content },
                {
                    where: {
                        id: req.params.commentID,
                        userId: req.session.user_id
                    },
                }
            );
            if (!updatedComment[0]) {
                res.status(404).json({ message: 'Comment not found or unauthorized'});
                return;
            }

            res.status(200).json({ message: 'Comment updated successfully'})
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async deleteComment(req, res) {
        try {
            const deletedComment = await Comment.destroy({
                where: {
                    id: req.params.commentID,
                    userId: req.session.user_id,
                },
            });
    
            if (!deletedComment) {
                res.status(404).json({ message: 'Comment not found or unauthorized'});
                return;
            }
    
            res.status(200).json({ message: 'Comment deleted'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error'});
        }
    }
};


router.post('/comments', commentController.createComment);
router.put('/comments/:commentID', commentController.updateComment);
router.delete('/comments/:commentID', commentController.deleteComment);

module.exports = router;

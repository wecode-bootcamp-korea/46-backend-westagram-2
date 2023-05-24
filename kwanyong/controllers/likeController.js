const likeService = require('../services/likeService');

const postlike = async(req , res) => {
    try {
        const { userId, postId } = req.params;
        await likeService.likesignup(userId, postId);
        return res.status(201).json({message : "like created"})
    }catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

module.exports = {
    postlike
}
const likeDao = require('../models/likeDao')

const likesignup = async ( userId, postId ) => {

    const clickLike = await likeDao.clickLike( userId, postId );
        return clickLike;
    }
        
  module.exports = {
    likesignup
  }
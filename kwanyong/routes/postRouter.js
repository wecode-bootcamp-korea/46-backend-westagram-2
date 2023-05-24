const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/posting', postController.postsCreate);

module.exports = {
	router
}
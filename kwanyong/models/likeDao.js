const { myDataSource } = require("./dataSource");

const clickLike = async( userId, postId ) => {
    try {
        return await myDataSource.query(
        `INSERT INTO likes(
            user_id,
            post_id
        ) VALUES (?, ?);
        `,
        [ userId, postId ]);
    } catch (err) {
		const error = new Error('INVALID_LIKEDATA_INPUT');
		error.statusCode = 500;
		throw error;
    }
}

module.exports = {
    clickLike
}
-- migrate:up
ALTER TABLE posts ADD column image_url VARCHAR(3000) NULL;

-- migrate:down
DROP TABLE posts_add_imageurl;
-- migrate:up
ALTER TABLE posts ADD column updated_at TIMESTAMP null on UPDATE CURRENT_TIMESTAMP;

-- migrate:down
DROP TABLE posts_add_updated;

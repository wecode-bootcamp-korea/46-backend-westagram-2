-- migrate:up
ALTER TABLE likes ADD CONSTRAINT unique_likes UNIQUE (user_id, post_id)

-- migrate:down
ALTER TABLE likes DROP INDEX unique_likes;

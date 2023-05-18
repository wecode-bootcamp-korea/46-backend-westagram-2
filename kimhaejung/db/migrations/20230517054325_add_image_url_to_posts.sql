-- migrate:up
ALTER TABLE posts ADD image_url VARCHAR(1000) NULL;


-- migrate:down
ALTER TABLE posts DROP COLUMN image_url;


-- migrate:up
create table likes (
  id int not null auto_increment,
  user_id int not null,
  post_id int not null,
	PRIMARY KEY(id),
  CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id)
)


-- migrate:down
DROP TABLE likes;

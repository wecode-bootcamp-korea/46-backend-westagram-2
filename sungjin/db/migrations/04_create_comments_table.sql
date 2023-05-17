-- migrate:up
create table comments (
  id int not null auto_increment,
  content varchar(3000) not null,
  user_id int not null,
  post_id int not null,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
)
-- migrate:down
drop table comments;
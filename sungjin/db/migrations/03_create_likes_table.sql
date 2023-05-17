-- migrate:up
create table likes (
  id int not null auto_increment,
  user_id int not null,
  post_id int not null,
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
  //user_id, post_id 동시 중복을 피하는 sql 제약조건 
)
-- migrate:down
drop table likes;
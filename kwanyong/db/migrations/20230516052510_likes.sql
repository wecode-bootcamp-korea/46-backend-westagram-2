-- migrate:up
-- migrate:up
create table likes (
    id int not null AUTO_INCREMENT,
    user_id int not null,
    post_id int not null,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id),
    PRIMARY KEY(id)
);

-- migrate:down
drop table likes;

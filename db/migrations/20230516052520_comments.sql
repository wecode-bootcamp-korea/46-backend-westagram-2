-- migrate:up
create table comments(
    id int not null AUTO_INCREMENT,
    content varchar(3000) not null,
    user_id int not null, 
    FOREIGN KEY(user_id) REFERENCES users(id),
    post_id int not null, 
    FOREIGN KEY(post_id) REFERENCES posts(id),
    PRIMARY KEY(id)
);

-- migrate:down
drop table comment;

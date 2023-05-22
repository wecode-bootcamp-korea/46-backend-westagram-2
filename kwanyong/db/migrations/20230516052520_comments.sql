-- migrate:up
create table comment(
    id int not null PRIMARY KEY(id),
    content varchar(3000) not null,
    user_id int not null FOREIGN KEY(user_id) REFERENCES users(id),
    post_id int not null FOREIGN KEY(post_id) REFERENCES post(id)
);

-- migrate:down
drop table comment

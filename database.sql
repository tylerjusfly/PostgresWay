create table users (
	id BIGSERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	pass TEXT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT Now()
);

create table rooms (
  roomid BIGSERIAL PRIMARY KEY,
  topic VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT Now()
);

CREATE INDEX room_topic ON rooms(topic);

-- create table posts(
-- 	postid BIGSERIAL PRIMARY KEY,
-- 	subject TEXT NOT NULL,
-- 	body TEXT NOT NULL,
-- 	roomid INT,
-- 	comments TEXT [],
-- 	CONSTRAINT fk_room_post
-- 		FOREIGN KEY(roomid)
-- 			REFERENCES rooms(roomid)
-- 			ON DELETE CASCADE,
-- 	CONSTRAINT fk_comments
-- 		FOREIGN KEY(comments)
-- 			REFERENCES comments(body)
-- 			ON DELETE CASCADE
-- );
create table posts(
	postid BIGSERIAL PRIMARY KEY,
	subject TEXT NOT NULL,
	body TEXT NOT NULL,
	roomid INT,
	comments TEXT [] REFERENCES comments(body),
	CONSTRAINT fk_room_post
		FOREIGN KEY(roomid)
			REFERENCES rooms(roomid)
			ON DELETE CASCADE
);


create table comments (
	commentid BIGSERIAL PRIMARY KEY,
	body TEXT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT Now()
)
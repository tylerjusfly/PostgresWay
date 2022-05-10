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

create table posts(
	postid BIGSERIAL PRIMARY KEY,
	subject TEXT NOT NULL,
	body TEXT NOT NULL,
	roomid INT,
	CONSTRAINT fk_room_post
		FOREIGN KEY(roomid)
			REFERENCES rooms(roomid)
			ON DELETE CASCADE
);


-- Tickets needs to have many post
-- and the post can have multiple comments
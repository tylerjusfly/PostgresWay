create table users (
	id BIGSERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	pass TEXT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT Now()
);
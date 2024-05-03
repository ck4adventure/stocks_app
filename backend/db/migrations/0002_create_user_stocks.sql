BEGIN;

CREATE TABLE user_stocks (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	initials VARCHAR(5) NOT NULL CONSTRAINT initials_not_empty CHECK (LENGTH(initials) > 0),
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	CONSTRAINT user_stocks_unique UNIQUE (user_id, initials)
);

COMMIT;
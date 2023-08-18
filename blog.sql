DROP TABLE IF EXISTS articles;
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  created_at TEXT DEFAULT (datetime('now')),
  title TEXT,
  content TEXT
);

DROP TABLE IF EXISTS channels;
CREATE TABLE IF NOT EXISTS channels (
	id VARCHAR(64) NOT NULL, 
	url VARCHAR(256) NOT NULL, 
	name VARCHAR(64) NOT NULL, 
	rss VARCHAR(256) NOT NULL, 
	autodownload INTEGER NOT NULL, 
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS videos;
CREATE TABLE IF NOT EXISTS videos (
	id VARCHAR(64) NOT NULL, 
	url VARCHAR(256) NOT NULL, 
	title VARCHAR(256) NOT NULL, 
	published DATETIME NOT NULL, 
	channel_id INTEGER NOT NULL, 
	downloaded INTEGER NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(channel_id) REFERENCES channels (id)
);
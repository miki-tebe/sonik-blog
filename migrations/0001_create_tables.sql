-- Migration number: 0001 	 2023-08-16T13:06:10.997Z
DROP TABLE IF EXISTS channels;
CREATE TABLE channels (
        id VARCHAR(64) NOT NULL,
        url VARCHAR(256) NOT NULL,
        name VARCHAR(64) NOT NULL,
        rss VARCHAR(256) NOT NULL,
        autodownload INTEGER NOT NULL,
        PRIMARY KEY (id)
);
DROP TABLE IF EXISTS videos;
CREATE TABLE videos (
        id VARCHAR(64) NOT NULL,
        url VARCHAR(256) NOT NULL,
        title VARCHAR(256) NOT NULL,
        published DATETIME NOT NULL,
        channel_id INTEGER NOT NULL,
        downloaded INTEGER NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY(channel_id) REFERENCES channels (id)
);
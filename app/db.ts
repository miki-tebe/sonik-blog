export type Suggestion = {
  id: string;
  link: string;
  created_at: string;
};

export type Channel = {
  id: string;
  url: string;
  name: string;
  rss: string;
  autodownload: number;
};

export type Video = {
  id: string;
  url: string;
  title: string;
  published: string;
  channel_id: number;
  downloaded: number;
};

export const createSuggestion = async (
  db: D1Database,
  suggestion: Pick<Suggestion, "link">
) => {
  const id = crypto.randomUUID();
  const { results } = await db
    .prepare(`INSERT INTO suggestions(id, title, content) VALUES(?, ?, ?)`)
    .bind(id, suggestion.link)
    .run();
  const suggestions = results;
};

export const findAllChannels = async (db: D1Database) => {
  const { results } = await db.prepare(`SELECT * FROM channels`).all<Channel>();
  const channels = results;
  return channels;
};

export const findChannelById = async (db: D1Database, id: string) => {
  const channel = await db
    .prepare(`SELECT * FROM channels WHERE id = ?`)
    .bind(id)
    .first<Channel>();
  return channel;
};

export const findAllVideos = async (db: D1Database) => {
  const { results } = await db.prepare(`SELECT * FROM videos`).all<Video>();
  const videos = results;
  return videos;
};

export const findVideoById = async (db: D1Database, id: string) => {
  const video = await db
    .prepare(`SELECT * FROM videos WHERE id = ?`)
    .bind(id)
    .first<Video>();
  return video;
};

export const findVideosByChannelId = async (db: D1Database, id: string) => {
  const { results } = await db
    .prepare(`SELECT * FROM videos WHERE channel_id = ? ORDER BY published DESC;`)
    .bind(id)
    .all<Video>();
  return results;
};

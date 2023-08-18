export type Article = {
  id: string;
  title: string;
  content: string;
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

export const findAllArticles = async (db: D1Database) => {
  const { results } = await db
    .prepare(`SELECT * FROM articles ORDER BY created_at DESC`)
    .all<Article>();
  const articles = results;
  return articles;
};

export const findArticleById = async (db: D1Database, id: string) => {
  const article = await db
    .prepare(`SELECT * FROM articles WHERE id = ?`)
    .bind(id)
    .first<Article>();
  return article;
};

export const createArticle = async (
  db: D1Database,
  article: Pick<Article, "title" | "content">
) => {
  const id = crypto.randomUUID();
  const { results } = await db
    .prepare(`INSERT INTO articles(id, title, content) VALUES(?, ?, ?)`)
    .bind(id, article.title, article.content)
    .run();
  const articles = results;
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
    .prepare(`SELECT * FROM videos WHERE channel_id = ?`)
    .bind(id)
    .all<Video>();
  return results;
};

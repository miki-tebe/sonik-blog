import type { Route } from "../../types";
import { findVideosByChannelId } from "../../db";

const title = "Music Videos";

export default {
  GET: async (c, { head }) => {
    head.title = title;
    const id = c.req.param("id");
    const videos = await findVideosByChannelId(c.get("DB"), id);
    const youtubeUrls = videos.map((video) => video.id).join(",");

    return (
      <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col">
        <h1 class="font-extrabold text-5xl text-gray-800">{title}</h1>
        <section class="mt-8">
          <h4 class="text-3xl font-bold text-gray-800 py-4">Playlist Mode</h4>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/VIDEO_ID?playlist=${youtubeUrls}`}
            title="Playlist"
            frameBorder="0"
            class="aspect-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {/* <h4 class="text-3xl font-bold text-gray-800 py-4">
            Music Video Mode
          </h4>
          <ul>
            {videos.map((video) => (
              <li key={video.id} class="mb-4">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </li>
            ))}
          </ul> */}
        </section>
      </div>
    );
  },
} satisfies Route;

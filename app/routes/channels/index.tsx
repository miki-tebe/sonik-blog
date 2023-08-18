import type { Route } from "../../types";
import { findAllChannels } from "../../db";

const title = "Artists/Channels";

export default {
  GET: async (c, { head }) => {
    head.title = title;

    const channels = await findAllChannels(c.get("DB"));

    return (
      <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col">
        <h1 class="font-extrabold text-5xl text-gray-800">{title}</h1>
        <section class="mt-8">
          <ul>
            {channels.map((channel) => (
              <li
                class="bg-white p-6 rounded-lg shadow-lg mb-4"
                key={channel.id}
              >
                <a href={`channels/${channel.id}`}>
                  <h3 class="text-2xl font-bold mb-2 text-gray-800 hover:text-gray-600 hover:text-underline">
                    {channel.name}
                  </h3>
                  <div class="text-gray-500 text-sm">{channel.url}</div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  },
} satisfies Route;

import type { Route } from "../types";

const title = "Home";

export default {
  GET: async (c, { head }) => {
    head.title = title;

    return (
      <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col">
        <h1 class="font-extrabold text-5xl text-gray-800">{title}</h1>
        <section class="mt-8">
          <div class="flex justify-between items-center">
            <a
              href="/channels"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Artist/Channel List
            </a>
            <a
              href="/channels/create"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Suggest channel
            </a>
          </div>
        </section>
      </div>
    );
  },
} satisfies Route;

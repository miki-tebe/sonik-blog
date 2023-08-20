import { Route } from "../../types";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { createSuggestion } from "../../db";

interface Data {
  error?: Record<string, string[] | undefined>;
  link?: string;
}

const headValue = {
  title: "Suggest Channel",
  link: [
    {
      rel: "stylesheet",
      href: "/static/article.css",
    },
  ],
};

const Page = (data?: Data) => {
  return (
    <div class="min-h-screen bg-gray-200">
      <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col">
        <h1 class="font-extrabold text-5xl text-gray-800">Create Post</h1>
        <form
          class="rounded-xl border p-5 shadow-md bg-white mt-8"
          method="POST"
        >
          <div class="flex flex-col gap-y-2">
            <div>
              <label class="text-gray-500 text-sm" htmlFor="link">
                Youtube channel link
              </label>
              <input
                id="link"
                class="w-full p-2 border border-gray-300 rounded-md"
                type="text"
                name="link"
                value={data?.link}
              />
              {data?.error?.link && (
                <p class="text-red-500 text-sm">{data.error.link}</p>
              )}
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              type="submit"
            >
              Suggest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default {
  GET: (_, { head }) => {
    head.set(headValue);
    return Page();
  },
  APP: (app, { render, head }) => {
    const schema = z.object({
      link: z.string().min(1).url().startsWith("https://www.youtube.com/", {
        message:
          "Must be a youtube channel link eg. https://www.youtube.com/channel/channel_id or https://www.youtube.com/@channel_name",
      }),
    });
    app.post(
      "/create",
      zValidator("form", schema, (res) => {
        if (!res.success) {
          const link = res.data.link;
          head.set(headValue);
          return render(
            Page({
              error: res.error.flatten().fieldErrors,
              link,
            })
          );
        }
      }),
      async (c) => {
        const { link } = c.req.valid("form");
        await createSuggestion(c.get("DB"), {
          link,
        });
        return c.redirect("/", 303);
      }
    );
  },
} satisfies Route;

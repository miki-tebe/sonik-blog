import type { LayoutHandler } from "sonik/preact";

const handler: LayoutHandler = ({ children, head }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {import.meta.env.PROD ? (
          <>
            <link href="/static/style.css" rel="stylesheet" />
            <script type="module" src="/static/client.js"></script>
          </>
        ) : (
          <>
            <link href="/app/style.css" rel="stylesheet" />
            <script type="module" src="/app/client.ts"></script>
          </>
        )}
        {head.createTags()}
      </head>
      <body>
        <nav class="m-4">
          <ul class="flex mb-4">
            <li class="mr-6">
              <a class="text-blue-500 hover:text-blue-800" href="/">
                Home
              </a>
            </li>
            <li class="mr-6">
              <a class="text-blue-500 hover:text-blue-800" href="/channels">
                Channels
              </a>
            </li>
          </ul>
        </nav>
        <div class="bg-gray-200">{children}</div>
      </body>
    </html>
  );
};

export default handler;

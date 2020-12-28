import { listenAndServe } from "https://deno.land/std/http/server.ts";

listenAndServe({ port: 8000 }, async (req) => {
  if (req.method === "GET" && req.url === "/") {
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html",
      }),
      body: await Deno.open("./index.html"),
    });
  }
  else if (req.method === "GET" && req.url.endsWith(".ts"))
  {
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "application/x-typescript"
      }),
      body: await Deno.open(`.${req.url}`)
    });
  }
  else if (req.method === "GET" && req.url.endsWith(".js"))
  {
    req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "test/javascript"
      }),
      body: await Deno.open(`.${req.url}`)
    });
  }
  else
  {
    console.log(req.url);
    req.respond({
      status: 404
    });
  }
});

console.log("Server running on localhost:8000");
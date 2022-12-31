import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
import {
  bold,
  cyan,
  green,
  yellow,
} from "https://deno.land/std@0.152.0/fmt/colors.ts";

const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(
    `${green(ctx.request.method)} ${cyan(ctx.request.url.pathname)} - ${
      bold(
        String(rt),
      )
    }`,
  );
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods())

app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(
    bold(" running on port ") + yellow(`${hostname}:${port}`),
  );
  console.log(bold(" using HTTP server: " + yellow(serverType)));
});

await app.listen({ hostname: "127.0.0.1", port: 8000 });
console.log(bold("Finished."));


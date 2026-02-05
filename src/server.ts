import { Hono } from "hono";
import {
  getAudioFile,
  getAutomixQueue,
  getFeatured,
  getInfo,
  getSearchResult,
} from "./index";

const app = new Hono();

app.get("/health", (c) => c.json({ status: "healthy" }));
app.get("/", (c) =>
  c.json({
    author: "navetacandra",
    profile: "https://github.com/navetacandra",
    endpoint: {
      featured: c.req.url + "featured",
      search: c.req.url + "search/:keyword",
      info: c.req.url + "info/:id",
      automix: c.req.url + "automix/:id",
      audio: c.req.url + "audio/:id",
    },
  }),
);

app.get("/featured", async (c) => c.json({ result: await getFeatured() }));

app.get("/search/:keyword", async (c) =>
  c.json({
    keyword: c.req.param("keyword"),
    result: await getSearchResult(c.req.param("keyword")),
  }),
);

app.get("/info/:id", async (c) =>
  c.json({
    musicId: c.req.param("id"),
    data: await getInfo(c.req.param("id")),
  }),
);

app.get("/automix/:id", async (c) =>
  c.json({
    musicId: c.req.param("id"),
    result: await getAutomixQueue(c.req.param("id")),
  }),
);

app.get("/audio/:id", async (c) =>
  c.json({
    musicId: c.req.param("id"),
    audioURL: await getAudioFile(c.req.param("id")),
  }),
);

export default app;

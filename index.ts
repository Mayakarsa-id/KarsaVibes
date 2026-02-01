import {
  getAutomixPlaylistEndpoint,
  getAutomixQueue,
  getFeatured,
  getSearchResult,
} from "./music/music.service";

// Only for test purpose

const featured = getFeatured();
console.log(
  JSON.stringify(
    await Promise.all([
      await featured,
      await getSearchResult("Sheila On 7"),
      await getAutomixQueue((await featured)[0]!.videoId),
    ]),
  ),
);

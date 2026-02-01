import { getFeatured, getSearchResult } from "./music/music.service";

// Only for test purpose
console.log(
  JSON.stringify(
    await Promise.all([
      await getFeatured(),
      await getSearchResult("Sheila On 7"),
    ]),
  ),
);

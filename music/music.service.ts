import { search } from "jmespath";
import { createContext } from "../context";
import { getSessionData } from "../session";
import { youtubeMusicFetch } from "./music.api";
import type { Music } from "./music.types";
import { FEATURED_QUERY, SEARCH_QUERY } from "./music.queries";

/**
 * This function will fetch "Quick Picks" on Music Youtube's home page
 */
export async function getFeatured(): Promise<Music[]> {
  const sessionData = await getSessionData();
  const context = createContext(sessionData, { browseId: "FEmusic_home" });

  const response = await youtubeMusicFetch("browse", sessionData, context);
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get featured page: ${response.statusText}`
        : "Couldn't resolve music.youtube.com",
    );

  const body = await response.json();
  const data: Music[] = search(body, FEATURED_QUERY);
  return data;
}

/**
 * This function will fetch top result on Music Youtube's search page
 */
export async function getSearchResult(query: string): Promise<Music[]> {
  const sessionData = await getSessionData();
  const context = createContext(sessionData, { query });

  const response = await youtubeMusicFetch("search", sessionData, context);
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get search result for "${query}": ${response.statusText}`
        : "Couldn't resolve music.youtube.com",
    );

  const body = await response.json();
  const data: Music[] = search(body, SEARCH_QUERY);
  return data;
}

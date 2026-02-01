import { search } from "jmespath";
import { createContext } from "../context";
import { getSessionData, type SessionData } from "../session";
import { youtubeMusicFetch } from "./music.api";
import type { AutomixContextExtras, Music } from "./music.types";
import {
  FEATURED_QUERY,
  PLAYLIST_ENDPOINT_FIND_QUERY,
  PLAYLIST_QUERY,
  SEARCH_QUERY,
} from "./music.queries";

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

/**
 * This function will get Music Youtube automix params for `videoId`
 * @param videoId {string}
 */
export async function getAutomixPlaylistEndpoint(
  sessionData: SessionData,
  videoId: string,
): Promise<AutomixContextExtras> {
  const contextExtras = {
    videoId,
    isAudioOnly: true,
    tunerSettingValue: "AUTOMIX_SETTING_NORMAL",
  };
  const context = createContext(sessionData, contextExtras);

  const response = await youtubeMusicFetch("next", sessionData, context);
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get automix playlist endpoint for "${videoId}": ${response.statusText}`
        : "Couldn't resolve music.youtube.com",
    );

  const body: any = await response.json();
  const data = search(body, PLAYLIST_ENDPOINT_FIND_QUERY);
  if (!data) throw new Error("Invalid videoId or music not found");

  return {
    ...contextExtras,
    ...data,
    queueContextParams: body.queueContextParams,
  };
}

/**
 * This function will get Music Youtube automix for `videoId`
 * @param videoId {string}
 */
export async function getAutomixQueue(videoId: string): Promise<Music[]> {
  const sessionData = await getSessionData();
  const contextExtras = await getAutomixPlaylistEndpoint(sessionData, videoId);
  const context = createContext(sessionData, contextExtras);

  const response = await youtubeMusicFetch("next", sessionData, context);
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get automix for "${videoId}": ${response.statusText}`
        : "Couldn't resolve music.youtube.com",
    );

  const body = await response.json();
  const data: Music[] = search(body, PLAYLIST_QUERY);
  return data;
}

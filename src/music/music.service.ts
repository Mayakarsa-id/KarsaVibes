import { search } from "jmespath";
import { createContext } from "../context";
import { getSessionData } from "../session";
import { youtubeMusicFetch } from "./music.api";
import type { AutomixContextExtras, Music, MusicDetail } from "./music.types";
import type { SessionData } from "../session";
import {
  FEATURED_QUERY,
  MUSIC_DETAIL,
  PLAYLIST_ENDPOINT_FIND_QUERY,
  PLAYLIST_QUERY,
  SEARCH_QUERY,
} from "./music.queries";
import { convertToMp3 } from "./ytmp3.client";

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
 * This function will get Music Youtube automix params for `musicId`
 * @param musicId {string}
 */
export async function getAutomixPlaylistEndpoint(
  sessionData: SessionData,
  musicId: string,
): Promise<AutomixContextExtras> {
  const contextExtras = {
    videoId: musicId,
    isAudioOnly: true,
    tunerSettingValue: "AUTOMIX_SETTING_NORMAL",
  };
  const context = createContext(sessionData, contextExtras);

  const response = await youtubeMusicFetch("next", sessionData, context);
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get automix playlist endpoint for "${musicId}": ${response.statusText}`
        : "Couldn't resolve music.youtube.com",
    );

  const body: any = await response.json();
  const data = search(body, PLAYLIST_ENDPOINT_FIND_QUERY);
  if (!data) throw new Error("Invalid musicId or music not found");

  return {
    ...contextExtras,
    ...data,
    queueContextParams: body.queueContextParams,
  };
}

/**
 * This function will get Music Youtube automix for `musicId`
 * @param musicId {string}
 */
export async function getAutomixQueue(musicId: string): Promise<Music[]> {
  const sessionData = await getSessionData();
  const contextExtras = await getAutomixPlaylistEndpoint(sessionData, musicId);
  const context = createContext(sessionData, contextExtras);

  const response = await youtubeMusicFetch("next", sessionData, context);
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get automix for "${musicId}": ${response.statusText}`
        : "Couldn't resolve music.youtube.com",
    );

  const body = await response.json();
  const data: Music[] = search(body, PLAYLIST_QUERY);
  return data;
}

export async function getInfo(musicId: string): Promise<MusicDetail> {
  const sessionData = await getSessionData();
  const context = createContext(sessionData, {
    videoId: musicId,
    playbackContext: {
      contentPlaybackContext: {
        html5Preference: "HTML5_PREF_WANTS",
        lactMilliseconds: "1113",
        referer: "https://music.youtube.com/",
        signatureTimestamp: 20486,
        autoCaptionsDefaultOn: false,
        mdxContext: {},
        vis: 10,
      },
      devicePlaybackCapabilities: {
        supportsVp9Encoding: true,
        supportXhr: true,
      },
    },
    captionParams: {},
  });

  const response = await youtubeMusicFetch("player", sessionData, context);
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get info for "${musicId}": ${response.statusText}`
        : "Couldn't resolve music.youtube.com",
    );

  const body = await response.json();
  const data: MusicDetail = search(body, MUSIC_DETAIL);
  return data;
}

export function getAudioFile(musicId: string): Promise<string> {
  return convertToMp3(musicId);
}

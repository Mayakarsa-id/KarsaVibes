import { search } from "jmespath";
import { createContext } from "./helper/context";
import { getSessionData, type SessionData } from "./helper/session";

export type Music = {
  thumbnail: string;
  videoId: string;
  title: string;
  subtitle: string;
};

const MUSIC_ONLY_FILTER = `(
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_ATV'
||
  navigationEndpoint.watchEndpoint
  .watchEndpointMusicSupportedConfigs
  .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_OMV'
||
navigationEndpoint.watchEndpoint
.watchEndpointMusicSupportedConfigs
.watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_UGC'
)`;

function useAPI(
  mode: "browse" | "search" | "next",
  sessionData: SessionData,
  context: any,
): Promise<Response> {
  return fetch(
    `https://music.youtube.com/youtubei/v1/${mode}?prettyPrint=false`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Goog-Visitor-Id": sessionData.visitorData,
        "X-Youtube-Bootstrap-Logged-In": "false",
        "X-Youtube-Client-Name": "67",
        "X-Youtube-Client-Version": sessionData.clientVersion,
      },
      body: JSON.stringify(context),
    },
  );
}

/**
 * This function will fetch "Quick Picks" on Music Youtube's home page
 */
export async function getFeatured(): Promise<Music[]> {
  const sessionData = await getSessionData();
  const context = createContext(sessionData, { browseId: "FEmusic_home" });

  const response = await useAPI("browse", sessionData, context);
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get featured page: ${response.statusText}`
        : "Couldn't resolve music.youtube.com",
    );

  const body = await response.json();
  const data: Music[] = search(
    body,
    `
    contents.singleColumnBrowseResultsRenderer.tabs[].tabRenderer
    .content.sectionListRenderer.contents[].musicCarouselShelfRenderer.contents[]
    .musicResponsiveListItemRenderer.{
      thumbnail: thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
      videoId: join(
        '',
        flexColumns[]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[?
        ${MUSIC_ONLY_FILTER}
        ].navigationEndpoint.watchEndpoint.videoId | []
      ),
      title: join(
        '',
        flexColumns[]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[?
        ${MUSIC_ONLY_FILTER}
         ].text | []
      ),
      subtitle: join(
        '',
        flexColumns[]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[?
        !${MUSIC_ONLY_FILTER}
         &&
         !(
            navigationEndpoint.browseEndpoint
            .browseEndpointContextSupportedConfigs
            .browseEndpointContextMusicConfig.pageType
            == 'MUSIC_PAGE_TYPE_ALBUM'
          )
         ].text | []
      )
    }|[?videoId!='']`,
  );

  return data;
}

/**
 * This function will fetch top result on Music Youtube's search page
 */
export async function getSearchResult(query: string): Promise<Music[]> {
  const sessionData = await getSessionData();
  const context = createContext(sessionData, { query });

  const response = await useAPI("search", sessionData, context);
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get search result for "${query}": ${response.statusText}`
        : "Couldn't resolve music.youtube.com",
    );

  const body = await response.json();
  const data: Music[] = search(
    body,
    `
    contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[][
    musicCardShelfRenderer && [
      {
        thumbnail: musicCardShelfRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
        videoId: join('', musicCardShelfRenderer.title.runs[].navigationEndpoint.watchEndpoint.videoId),
        title: join('', musicCardShelfRenderer.title.runs[].text),
        subtitle: join('', musicCardShelfRenderer.subtitle.runs[].text)
      },
      musicCardShelfRenderer.contents[].musicResponsiveListItemRenderer.{
        thumbnail: thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
        videoId: join(
          '',
          flexColumns[]
          .musicResponsiveListItemFlexColumnRenderer.text.runs[?
          ${MUSIC_ONLY_FILTER}
          ].navigationEndpoint.watchEndpoint.videoId | []
        ),
        title: join(
          '',
          flexColumns[]
          .musicResponsiveListItemFlexColumnRenderer.text.runs[?
          ${MUSIC_ONLY_FILTER}
           ].text | []
        ),
        subtitle: join(
          ' ',
          flexColumns[]
          .musicResponsiveListItemFlexColumnRenderer.text.runs[?
          !${MUSIC_ONLY_FILTER}
           &&
           !(
              navigationEndpoint.browseEndpoint
              .browseEndpointContextSupportedConfigs
              .browseEndpointContextMusicConfig.pageType
              == 'MUSIC_PAGE_TYPE_ALBUM'
            )
           ].text | []
        )
      }
    ][]

    musicShelfRenderer.contents[].musicResponsiveListItemRenderer.{
      thumbnail: thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
      videoId: join(
        '',
        flexColumns[]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[?
        ${MUSIC_ONLY_FILTER}
        ].navigationEndpoint.watchEndpoint.videoId | []
      ),
      title: join(
        '',
        flexColumns[]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[?
        ${MUSIC_ONLY_FILTER}
         ].text | []
      ),
      subtitle: join(
        ' ',
        flexColumns[]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[?
        !${MUSIC_ONLY_FILTER}
         &&
         !(
            navigationEndpoint.browseEndpoint
            .browseEndpointContextSupportedConfigs
            .browseEndpointContextMusicConfig.pageType
            == 'MUSIC_PAGE_TYPE_ALBUM'
          )
         ].text | []
      )
    }
    ][][]|[?videoId!='']`,
  );

  return data;
}

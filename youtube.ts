import { search } from "jmespath";
import { createContext } from "./helper/context";
import { getSessionData } from "./helper/session";

export type FeaturedItem = {
  thumbnail: string;
  videoId: string;
  title: string;
  subtitle: string;
};

/**
 * This function will fetch "Quick Pick" on Music Youtube's home page
 */
export async function getFeatured(): Promise<FeaturedItem[]> {
  const sessionData = await getSessionData();
  const context = createContext(sessionData, { browseId: "FEmusic_home" });

  const response = await fetch(
    "https://music.youtube.com/youtubei/v1/browse?prettyPrint=false",
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
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get featured page: ${response.statusText}`
        : "Couldn't resolve music.youtube.com",
    );

  const body = await response.json();
  const data: FeaturedItem[] = search(
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
        navigationEndpoint.watchEndpoint
        .watchEndpointMusicSupportedConfigs
        .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_ATV'
        ].navigationEndpoint.watchEndpoint.videoId | []
      ),
      title: join(
        '',
        flexColumns[]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[?
         navigationEndpoint.watchEndpoint
         .watchEndpointMusicSupportedConfigs
         .watchEndpointMusicConfig.musicVideoType=='MUSIC_VIDEO_TYPE_ATV'
         ].text | []
      ),
      subtitle: join(
        '',
        flexColumns[]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[?
         navigationEndpoint.watchEndpoint
         .watchEndpointMusicSupportedConfigs
         .watchEndpointMusicConfig.musicVideoType!='MUSIC_VIDEO_TYPE_ATV'
         &&
         !(
            navigationEndpoint.browseEndpoint
            .browseEndpointContextSupportedConfigs
            .browseEndpointContextMusicConfig.pageType
            == 'MUSIC_PAGE_TYPE_ALBUM'
          )
         ].text | []
      )
    }`,
  );

  return data;
}

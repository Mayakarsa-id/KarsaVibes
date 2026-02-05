var import_node_module = require("node:module");
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __moduleCache = /* @__PURE__ */ new WeakMap;
var __toCommonJS = (from) => {
  var entry = __moduleCache.get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function")
    __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    }));
  __moduleCache.set(from, entry);
  return entry;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/index.ts
var exports_src = {};
__export(exports_src, {
  getSearchResult: () => getSearchResult,
  getInfo: () => getInfo,
  getFeatured: () => getFeatured,
  getAutomixQueue: () => getAutomixQueue,
  getAudioFile: () => getAudioFile
});
module.exports = __toCommonJS(exports_src);

// src/music/music.service.ts
var import_jmespath = require("jmespath");

// src/context.ts
function createContext(sessionData, extras) {
  return {
    context: {
      client: {
        hl: "en",
        gl: "ID",
        remoteHost: "%s",
        rolloutToken: "%s",
        deviceMake: "",
        deviceModel: "",
        visitorData: sessionData.visitorData,
        userAgent: "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0,gzip(gfe)",
        clientName: "WEB_REMIX",
        clientVersion: sessionData.clientVersion,
        osName: "X11",
        osVersion: "",
        originalUrl: "https://music.youtube.com/",
        platform: "DESKTOP",
        clientFormFactor: "UNKNOWN_FORM_FACTOR",
        configInfo: {
          appInstallData: sessionData.appInstallData,
          coldConfigData: null,
          coldHashData: null,
          hotHashData: null
        },
        browserName: "Firefox",
        browserVersion: "115.0",
        acceptHeader: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        deviceExperimentId: sessionData.deviceExperimentId,
        screenWidthPoints: 1920,
        screenHeightPoints: 1080,
        screenPixelDensity: 1,
        screenDensityFloat: 1,
        utcOffsetMinutes: 420,
        userInterfaceTheme: "USER_INTERFACE_THEME_LIGHT",
        timeZone: "Asia/Jakarta",
        musicAppInfo: {
          pwaInstallabilityStatus: "PWA_INSTALLABILITY_STATUS_UNKNOWN",
          webDisplayMode: "WEB_DISPLAY_MODE_BROWSER",
          storeDigitalGoodsApiSupportStatus: {
            playStoreDigitalGoodsApiSupportStatus: "DIGITAL_GOODS_API_SUPPORT_STATUS_UNSUPPORTED"
          }
        }
      },
      user: {
        lockedSafetyMode: false
      },
      request: {
        useSsl: true,
        internalExperimentFlags: [],
        consistencyTokenJars: []
      },
      clickTracking: {
        clickTrackingParams: sessionData.clickTrackingParams
      }
    },
    ...extras
  };
}

// src/session.ts
async function getSessionData() {
  const response = await fetch("https://music.youtube.com/", {
    headers: {
      accept: "text/html",
      "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36"
    }
  });
  if (!response.ok)
    throw new Error(response.status > 0 ? `Failed when get status data: ${response.statusText}` : "Couldn't resolve music.youtube.com");
  const body = await response.text();
  return {
    remoteHost: body.match(/"remoteHost":"([^"]+)"/)[1] || "",
    visitorData: body.match(/"visitorData":"([^"]+)"/)[1] || "",
    clientVersion: body.match(/"clientVersion":"([^"]+)"/)[1] || "",
    appInstallData: body.match(/"appInstallData":"([^"]+)"/)[1] || "",
    deviceExperimentId: body.match(/"deviceExperimentId":"([^"]+)"/)[1] || "",
    rolloutToken: body.match(/"rolloutToken":"([^"]+)"/)[1] || "",
    clickTrackingParams: body.match(/"clickTrackingParams":"([^"]+)"/)[1] || ""
  };
}

// src/music/music.api.ts
var HEADER = {
  Accept: "*/*",
  Connection: "keep-alive",
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0,gzip(gfe)"
};
function sleep(millis) {
  return new Promise((res) => setTimeout(res, millis));
}
function request(url, args) {
  return fetch(url, {
    method: args.method || "GET",
    mode: "cors",
    referrer: args.from,
    headers: { ...HEADER, Origin: args.from, ...args.headers },
    body: args.body
  });
}
async function resolveRedirect(url) {
  try {
    const response = await request(url, { from: url, method: "HEAD" });
    return response.url;
  } catch (err) {
    console.error(`Failed resolve redirect for ${url}: ${err}`);
    return null;
  }
}
function youtubeMusicFetch(mode, sessionData, context) {
  return request(`https://music.youtube.com/youtubei/v1/${mode}?prettyPrint=false`, {
    from: "https://music.youtube.com/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Visitor-Id": sessionData.visitorData,
      "X-Youtube-Bootstrap-Logged-In": "false",
      "X-Youtube-Client-Name": "67",
      "X-Youtube-Client-Version": sessionData.clientVersion
    },
    body: JSON.stringify(context)
  });
}

// src/music/music.queries.ts
var MUSIC_ONLY_FILTER = `(
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
var FEATURED_QUERY = `
contents.singleColumnBrowseResultsRenderer.tabs[].tabRenderer
.content.sectionListRenderer.contents[].musicCarouselShelfRenderer.contents[]
.musicResponsiveListItemRenderer.{
  thumbnail: thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
  musicId: join(
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
}|[?videoId!='']`;
var SEARCH_QUERY = `
contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[][
musicCardShelfRenderer && [
  {
    thumbnail: musicCardShelfRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
    musicId: join('', musicCardShelfRenderer.title.runs[].navigationEndpoint.watchEndpoint.videoId),
    title: join('', musicCardShelfRenderer.title.runs[].text),
    subtitle: join('', musicCardShelfRenderer.subtitle.runs[].text)
  },
  musicCardShelfRenderer.contents[].musicResponsiveListItemRenderer.{
    thumbnail: thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
    musicId: join(
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
  musicId: join(
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
][][]|[?videoId!='']`;
var PLAYLIST_ENDPOINT_FIND_QUERY = `
(contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
.watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content.musicQueueRenderer
.content.playlistPanelRenderer.contents[].automixPreviewVideoRenderer.content
.automixPlaylistVideoRenderer.navigationEndpoint.watchPlaylistEndpoint)[0]
`;
var PLAYLIST_QUERY = `
  (contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
  .watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content.musicQueueRenderer
  .content.playlistPanelRenderer.contents[].playlistPanelVideoRenderer|[?videoId!=''])[].{
    thumbnail: thumbnail.thumbnails[0].url,
    musicId: videoId,
    title: title.runs[0].text,
    subtitle: shortBylineText.runs[0].text
  }
`;
var MUSIC_DETAIL = `
  videoDetails.{
    musicId: videoId,
    title: title,
    thumbnail: thumbnail.thumbnails[0].url,
    author: author,
    duration: lengthSeconds.to_number(@),
    playCount: viewCount.to_number(@)
  }
`;

// src/music/ytmp3.client.ts
async function initConversion(musicId) {
  const response = await request("https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=" + Math.random(), { from: "https://id.ytmp3.mobi" });
  if (!response.ok)
    throw new Error(response.status > 0 ? `Failed when get ytmp3 init for "${musicId}": ${response.statusText}` : "Couldn't resolve d.ymcdn.org");
  const body = await response.json();
  return body.convertURL;
}
async function convertToMp3(musicId) {
  const convertURL = await initConversion(musicId) + `&v=${musicId}&f=mp3&_=${Math.random()}`;
  const response = await request(convertURL, { from: "https://id.ytmp3.mobi" });
  if (!response.ok)
    throw new Error(response.status > 0 ? `Failed when convert with ytmp3 for "${musicId}": ${response.statusText}` : "Couldn't resolve d.ymcdn.org");
  const body = await response.json();
  while (true) {
    const { progress } = await (await request(body.progressURL, { from: "https://id.ytmp3.mobi" })).json();
    if (progress === 3)
      return await resolveRedirect(body.downloadURL) ?? body.downloadURL;
    await sleep(250);
  }
}

// src/music/music.service.ts
async function getFeatured() {
  const sessionData = await getSessionData();
  const context = createContext(sessionData, { browseId: "FEmusic_home" });
  const response = await youtubeMusicFetch("browse", sessionData, context);
  if (!response.ok)
    throw new Error(response.status > 0 ? `Failed when get featured page: ${response.statusText}` : "Couldn't resolve music.youtube.com");
  const body = await response.json();
  const data = import_jmespath.search(body, FEATURED_QUERY);
  return data;
}
async function getSearchResult(query) {
  const sessionData = await getSessionData();
  const context = createContext(sessionData, { query });
  const response = await youtubeMusicFetch("search", sessionData, context);
  if (!response.ok)
    throw new Error(response.status > 0 ? `Failed when get search result for "${query}": ${response.statusText}` : "Couldn't resolve music.youtube.com");
  const body = await response.json();
  const data = import_jmespath.search(body, SEARCH_QUERY);
  return data;
}
async function getAutomixPlaylistEndpoint(sessionData, musicId) {
  const contextExtras = {
    videoId: musicId,
    isAudioOnly: true,
    tunerSettingValue: "AUTOMIX_SETTING_NORMAL"
  };
  const context = createContext(sessionData, contextExtras);
  const response = await youtubeMusicFetch("next", sessionData, context);
  if (!response.ok)
    throw new Error(response.status > 0 ? `Failed when get automix playlist endpoint for "${musicId}": ${response.statusText}` : "Couldn't resolve music.youtube.com");
  const body = await response.json();
  const data = import_jmespath.search(body, PLAYLIST_ENDPOINT_FIND_QUERY);
  if (!data)
    throw new Error("Invalid musicId or music not found");
  return {
    ...contextExtras,
    ...data,
    queueContextParams: body.queueContextParams
  };
}
async function getAutomixQueue(musicId) {
  const sessionData = await getSessionData();
  const contextExtras = await getAutomixPlaylistEndpoint(sessionData, musicId);
  const context = createContext(sessionData, contextExtras);
  const response = await youtubeMusicFetch("next", sessionData, context);
  if (!response.ok)
    throw new Error(response.status > 0 ? `Failed when get automix for "${musicId}": ${response.statusText}` : "Couldn't resolve music.youtube.com");
  const body = await response.json();
  const data = import_jmespath.search(body, PLAYLIST_QUERY);
  return data;
}
async function getInfo(musicId) {
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
        vis: 10
      },
      devicePlaybackCapabilities: {
        supportsVp9Encoding: true,
        supportXhr: true
      }
    },
    captionParams: {}
  });
  const response = await youtubeMusicFetch("player", sessionData, context);
  if (!response.ok)
    throw new Error(response.status > 0 ? `Failed when get info for "${musicId}": ${response.statusText}` : "Couldn't resolve music.youtube.com");
  const body = await response.json();
  const data = import_jmespath.search(body, MUSIC_DETAIL);
  return data;
}
function getAudioFile(musicId) {
  return convertToMp3(musicId);
}

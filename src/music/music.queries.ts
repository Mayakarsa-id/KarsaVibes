export const MUSIC_ONLY_FILTER = `(
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

export const FEATURED_QUERY = `
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

export const SEARCH_QUERY = `
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

export const PLAYLIST_ENDPOINT_FIND_QUERY = `
(contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
.watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content.musicQueueRenderer
.content.playlistPanelRenderer.contents[].automixPreviewVideoRenderer.content
.automixPlaylistVideoRenderer.navigationEndpoint.watchPlaylistEndpoint)[0]
`;

export const PLAYLIST_QUERY = `
  (contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
  .watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content.musicQueueRenderer
  .content.playlistPanelRenderer.contents[].playlistPanelVideoRenderer|[?videoId!=''])[].{
    thumbnail: thumbnail.thumbnails[0].url,
    musicId: videoId,
    title: title.runs[0].text,
    subtitle: shortBylineText.runs[0].text
  }
`;

export const MUSIC_DETAIL = `
  videoDetails.{
    musicId: videoId,
    title: title,
    thumbnail: thumbnail.thumbnails[0].url,
    author: author,
    duration: lengthSeconds.to_number(@),
    playCount: viewCount.to_number(@)
  }
`;

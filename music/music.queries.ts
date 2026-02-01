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
}|[?videoId!='']`;

export const SEARCH_QUERY = `
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
][][]|[?videoId!='']`;

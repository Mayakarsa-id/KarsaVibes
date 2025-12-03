package youtube

import (
	"log"
	"regexp"
	"strings"

	"github.com/Mayakarsa-id/KarsaVibes/internal/request"
	"github.com/tidwall/gjson"
)

type FeaturedItem struct {
	Title      string `json:"title"`
	WatchId    string `json:"watchId"`
	PlaylistId string `json:"playlistId"`
	Thumbnail  string `json:"thumbnail"`
}

var thumbnailSizeRegex *regexp.Regexp = regexp.MustCompile(`=w\d+-h\d+`)

func GetFeaturedItems() [20]FeaturedItem {
	clientData := GetClientData()
	context := ContextBuilder(clientData.RemoteHost, clientData.VisitorData, clientData.ClientVersion, clientData.AppInstallData, clientData.DeviceExperimentId, clientData.RolloutToken, clientData.ClickTrackingParams, `"browseId": "FEmusic_home"`)
	resp, err := request.Post("https://music.youtube.com/youtubei/v1/browse?prettyPrint=false", map[string]string{
		"Accept":                        "application/json",
		"Content-Type":                  "application/json",
		"X-Goog-Visitor-Id":             clientData.VisitorData,
		"X-Youtube-Bootstrap-Logged-In": "false",
		"X-Youtube-Client-Name":         "67",
		"X-Youtube-Client-Version":      clientData.ClientVersion,
	}, strings.NewReader(context))

	if err != nil {
		log.Fatalln(err)
	}

	var result [20]FeaturedItem

	gjsonRes := gjson.Get(resp, "contents.singleColumnBrowseResultsRenderer.tabs.#.tabRenderer.content.sectionListRenderer.contents.#.musicCarouselShelfRenderer.contents.#.musicResponsiveListItemRenderer")
	runs := gjsonRes.Get(`#.#.#.flexColumns.#.musicResponsiveListItemFlexColumnRenderer.text.runs.#(navigationEndpoint.watchEndpoint.watchEndpointMusicSupportedConfigs.watchEndpointMusicConfig.musicVideoType=="MUSIC_VIDEO_TYPE_ATV")|@flatten|@flatten|@flatten`).Array()
	gjsonThumbs := gjsonRes.Get(`#.#.#.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.0.url|@flatten|@flatten`).Array()

	if len(runs) != len(gjsonThumbs) { // invalid data
		return result
	}

	for i, run := range runs {
		result[i] = FeaturedItem{
			Title:      run.Get("text").Str,
			WatchId:    run.Get("navigationEndpoint.watchEndpoint.videoId").Str,
			PlaylistId: run.Get("navigationEndpoint.watchEndpoint.playlistId").Str,
			Thumbnail: string(
				thumbnailSizeRegex.ReplaceAll([]byte(gjsonThumbs[i].Str), []byte("=w120-h120")),
			),
		}
	}

	return result
}

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

	runs := gjson.Get(gjsonRes.String(), "#.#.#.flexColumns.#.musicResponsiveListItemFlexColumnRenderer.text.runs.0")
	gjsonThumbs := gjson.Get(gjsonRes.String(), "#.#.#.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.0").Array()

	var tmp string = "["
	var tmpThumbnails string = "["

	for a, v1 := range runs.Array() {
		for b, v2 := range v1.Array() {
			for c, v3 := range v2.Array() {
				for d, v4 := range v3.Array() {
					itemType := gjson.Get(v4.String(), "navigationEndpoint.watchEndpoint.watchEndpointMusicSupportedConfigs.watchEndpointMusicConfig.musicVideoType")
					if itemType.Exists() && itemType.Str == "MUSIC_VIDEO_TYPE_ATV" {
						tmp = tmp + v4.String() + ", "
						tmpThumbnails = tmpThumbnails + gjsonThumbs[a].Array()[b].Array()[c].Array()[d].String() + ", "
					}
				}
			}
		}
	}
	tmp = tmp + "]"
	tmpThumbnails = tmpThumbnails + "]"

	titles := gjson.Get(tmp, "#.text").Array()
	watchIds := gjson.Get(tmp, "#.navigationEndpoint.watchEndpoint.videoId").Array()
	watchPlIds := gjson.Get(tmp, "#.navigationEndpoint.watchEndpoint.playlistId").Array()
	thumbnails := gjson.Get(tmpThumbnails, "#.url").Array()

	for i := range 20 {
		if len(titles) < i {
			break
		}
		result[i] = FeaturedItem{
			Title:      titles[i].Str,
			WatchId:    watchIds[i].Str,
			PlaylistId: watchPlIds[i].Str,
			Thumbnail: string(
				thumbnailSizeRegex.ReplaceAll([]byte(thumbnails[i].Str), []byte("=w120-h120")),
			),
		}
	}

	return result
}

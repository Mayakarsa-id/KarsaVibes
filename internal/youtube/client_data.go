package youtube

import (
	"log"
	"regexp"

	"github.com/Mayakarsa-id/KarsaVibes/internal/request"
)

type ClientData struct {
	RemoteHost          string
	VisitorData         string
	ClientVersion       string
	AppInstallData      string
	DeviceExperimentId  string
	RolloutToken        string
	ClickTrackingParams string
}

var rhostReg *regexp.Regexp = regexp.MustCompile(`"remoteHost":"([^"]+)"`)
var vdatReg *regexp.Regexp = regexp.MustCompile(`"visitorData":"([^"]+)"`)
var cverReg *regexp.Regexp = regexp.MustCompile(`"clientVersion":"([^"]+)"`)
var appinstReg *regexp.Regexp = regexp.MustCompile(`"appInstallData":"([^"]+)"`)
var devexReg *regexp.Regexp = regexp.MustCompile(`"deviceExperimentId":"([^"]+)"`)
var rolloutReg *regexp.Regexp = regexp.MustCompile(`"rolloutToken":"([^"]+)"`)
var ctrackReg *regexp.Regexp = regexp.MustCompile(`"clickTrackingParams":"([^"]+)"`)

func GetClientData() ClientData {
	html, err := request.Get("https://music.youtube.com/", map[string]string{"Accept": "text/html"})
	if err != nil {
		log.Fatalln(err)
	}

	return ClientData{
		RemoteHost:          rhostReg.FindStringSubmatch(html)[1],
		VisitorData:         vdatReg.FindStringSubmatch(html)[1],
		ClientVersion:       cverReg.FindStringSubmatch(html)[1],
		AppInstallData:      appinstReg.FindStringSubmatch(html)[1],
		DeviceExperimentId:  devexReg.FindStringSubmatch(html)[1],
		RolloutToken:        rolloutReg.FindStringSubmatch(html)[1],
		ClickTrackingParams: ctrackReg.FindStringSubmatch(html)[1],
	}

}

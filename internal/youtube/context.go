package youtube

import "fmt"

func ContextBuilder(remoteHost, visitorData, clientVersion, appInstallData, deviceExperimentId, rolloutToken, clickTrackingParams string, addon string) string {
	contextTemplate := `{
  "context": {
    "client": {
      "hl": "en",
      "gl": "ID",
      "remoteHost": "%s",
      "rolloutToken": "%s",
      "deviceMake": "",
      "deviceModel": "",
      "visitorData": "%s",
      "userAgent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0,gzip(gfe)",
      "clientName": "WEB_REMIX",
      "clientVersion": "%s",
      "osName": "X11",
      "osVersion": "",
      "originalUrl": "https://music.youtube.com/",
      "platform": "DESKTOP",
      "clientFormFactor": "UNKNOWN_FORM_FACTOR",
      "configInfo": {
        "appInstallData": "%s",
        "coldConfigData": null,
        "coldHashData": null,
        "hotHashData": null
      },
      "browserName": "Firefox",
      "browserVersion": "115.0",
      "acceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "deviceExperimentId": "%s",
      "screenWidthPoints": 1920,
      "screenHeightPoints": 1080,
      "screenPixelDensity": 1,
      "screenDensityFloat": 1,
      "utcOffsetMinutes": 420,
      "userInterfaceTheme": "USER_INTERFACE_THEME_LIGHT",
      "timeZone": "Asia/Jakarta",
      "musicAppInfo": {
        "pwaInstallabilityStatus": "PWA_INSTALLABILITY_STATUS_UNKNOWN",
        "webDisplayMode": "WEB_DISPLAY_MODE_BROWSER",
        "storeDigitalGoodsApiSupportStatus": {
          "playStoreDigitalGoodsApiSupportStatus": "DIGITAL_GOODS_API_SUPPORT_STATUS_UNSUPPORTED"
        }
      }
    },
    "user": {
      "lockedSafetyMode": false
    },
    "request": {
      "useSsl": true,
      "internalExperimentFlags": [],
      "consistencyTokenJars": []
    },
    "clickTracking": {
      "clickTrackingParams": "%s"
    }
  }%s
}`
	var addonData string
	if addon != "" {
		addonData = fmt.Sprintf(",%s", addon)
	}

	return fmt.Sprintf(contextTemplate, remoteHost, rolloutToken, visitorData, clientVersion, appInstallData, deviceExperimentId, clickTrackingParams, addonData)
}

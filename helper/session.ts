export type SessionData = {
  remoteHost: string;
  visitorData: string;
  clientVersion: string;
  appInstallData: string;
  deviceExperimentId: string;
  rolloutToken: string;
  clickTrackingParams: string;
};

export async function getSessionData(): Promise<SessionData> {
  const response = await fetch("https://music.youtube.com/", {
    headers: {
      accept: "text/html",
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
    },
  });
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get status data: ${response.statusText}`
        : "Couldn't resolve music.youtube.com",
    );

  const body = await response.text();

  return {
    remoteHost: body.match(/"remoteHost":"([^"]+)"/)![1] || "",
    visitorData: body.match(/"visitorData":"([^"]+)"/)![1] || "",
    clientVersion: body.match(/"clientVersion":"([^"]+)"/)![1] || "",
    appInstallData: body.match(/"appInstallData":"([^"]+)"/)![1] || "",
    deviceExperimentId: body.match(/"deviceExperimentId":"([^"]+)"/)![1] || "",
    rolloutToken: body.match(/"rolloutToken":"([^"]+)"/)![1] || "",
    clickTrackingParams:
      body.match(/"clickTrackingParams":"([^"]+)"/)![1] || "",
  };
}

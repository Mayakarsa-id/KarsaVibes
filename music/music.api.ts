import type { SessionData } from "../session";

export function youtubeMusicFetch(
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

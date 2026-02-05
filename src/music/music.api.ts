import type { SessionData } from "../session";

export const HEADER = {
  Accept: "*/*",
  Connection: "keep-alive",
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0,gzip(gfe)",
};

export function sleep(millis: number): Promise<void> {
  return new Promise((res) => setTimeout(res, millis));
}

export function request(
  url: string,
  args: {
    from: string;
    method?: "GET" | "POST" | "HEAD";
    headers?: any;
    body?: string;
  },
) {
  return fetch(url, {
    method: args.method || "GET",
    mode: "cors",
    referrer: args.from,
    headers: { ...HEADER, Origin: args.from, ...args.headers },
    body: args.body,
  });
}

export async function resolveRedirect(url: string): Promise<string | null> {
  try {
    const response = await request(url, { from: url, method: "HEAD" });
    return response.url;
  } catch (err) {
    console.error(`Failed resolve redirect for ${url}: ${err}`);
    return null;
  }
}

export function youtubeMusicFetch(
  mode: "browse" | "search" | "next" | "player",
  sessionData: SessionData,
  context: any,
): Promise<Response> {
  return request(
    `https://music.youtube.com/youtubei/v1/${mode}?prettyPrint=false`,
    {
      from: "https://music.youtube.com/",
      method: "POST",
      headers: {
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

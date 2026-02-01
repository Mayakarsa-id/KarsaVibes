import { request, sleep } from "./music.api";

export async function initConversion(videoId: string): Promise<string> {
  const response = await request(
    "https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=" + Math.random(),
    { from: "https://id.ytmp3.mobi" },
  );

  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get ytmp3 init for "${videoId}": ${response.statusText}`
        : "Couldn't resolve d.ymcdn.org",
    );
  const body: any = await response.json();
  return body.convertURL;
}

export async function conveertToMp3(videoId: string): Promise<string> {
  const convertURL =
    (await initConversion(videoId)) + `&v=${videoId}&f=mp3&_=${Math.random()}`;

  const response = await request(convertURL, { from: "https://id.ytmp3.mobi" });
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when convert with ytmp3 for "${videoId}": ${response.statusText}`
        : "Couldn't resolve d.ymcdn.org",
    );

  const body: any = await response.json();

  while (true) {
    const { progress } = (await (
      await request(body.progressURL, { from: "https://id.ytmp3.mobi" })
    ).json()) as any;

    if (progress === 3) return body.downloadURL;
    await sleep(250);
  }
}

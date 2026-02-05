import { request, resolveRedirect, sleep } from "./music.api";

export async function initConversion(musicId: string): Promise<string> {
  const response = await request(
    "https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=" + Math.random(),
    { from: "https://id.ytmp3.mobi" },
  );

  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when get ytmp3 init for "${musicId}": ${response.statusText}`
        : "Couldn't resolve d.ymcdn.org",
    );
  const body: any = await response.json();
  return body.convertURL;
}

export async function convertToMp3(musicId: string): Promise<string> {
  const convertURL =
    (await initConversion(musicId)) + `&v=${musicId}&f=mp3&_=${Math.random()}`;

  const response = await request(convertURL, { from: "https://id.ytmp3.mobi" });
  if (!response.ok)
    throw new Error(
      response.status > 0
        ? `Failed when convert with ytmp3 for "${musicId}": ${response.statusText}`
        : "Couldn't resolve d.ymcdn.org",
    );

  const body: any = await response.json();

  while (true) {
    const { progress } = (await (
      await request(body.progressURL, { from: "https://id.ytmp3.mobi" })
    ).json()) as any;

    if (progress === 3)
      return (await resolveRedirect(body.downloadURL)) ?? body.downloadURL;

    await sleep(250);
  }
}

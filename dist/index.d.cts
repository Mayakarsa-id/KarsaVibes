type Music = {
	thumbnail: string;
	musicId: string;
	title: string;
	subtitle: string;
};
type MusicDetail = {
	musicId: string;
	title: string;
	thumbnail: string;
	author: string;
	duration: number;
	playCount: number;
};
type AutomixContextExtras = {
	videoId: string;
	isAudioOnly: true;
	tunerSettingValue: "AUTOMIX_SETTING_NORMAL";
	playlistId: string;
	params: string;
	queueContextParams: string;
};
type SessionData = {
	remoteHost: string;
	visitorData: string;
	clientVersion: string;
	appInstallData: string;
	deviceExperimentId: string;
	rolloutToken: string;
	clickTrackingParams: string;
};
/**
* This function will fetch "Quick Picks" on Music Youtube's home page
*/
declare function getFeatured(): Promise<Music[]>;
/**
* This function will fetch top result on Music Youtube's search page
*/
declare function getSearchResult(query: string): Promise<Music[]>;
/**
* This function will get Music Youtube automix for `musicId`
* @param musicId {string}
*/
declare function getAutomixQueue(musicId: string): Promise<Music[]>;
declare function getInfo(musicId: string): Promise<MusicDetail>;
declare function getAudioFile(musicId: string): Promise<string>;
export { getSearchResult, getInfo, getFeatured, getAutomixQueue, getAudioFile, SessionData, MusicDetail, Music, AutomixContextExtras };

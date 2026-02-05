export type Music = {
  thumbnail: string;
  musicId: string;
  title: string;
  subtitle: string;
};

export type MusicDetail = {
  musicId: string;
  title: string;
  thumbnail: string;
  author: string;
  duration: number;
  playCount: number;
};

export type AutomixContextExtras = {
  videoId: string;
  isAudioOnly: true;
  tunerSettingValue: "AUTOMIX_SETTING_NORMAL";
  playlistId: string;
  params: string;
  queueContextParams: string;
};

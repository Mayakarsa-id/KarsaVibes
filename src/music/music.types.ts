export type Music = {
  thumbnail: string;
  videoId: string;
  title: string;
  subtitle: string;
};

export type AutomixContextExtras = {
  videoId: string;
  isAudioOnly: true;
  tunerSettingValue: "AUTOMIX_SETTING_NORMAL";
  playlistId: string;
  params: string;
  queueContextParams: string;
};

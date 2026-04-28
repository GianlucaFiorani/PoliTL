export const extractPlayer = (silhouettes) => {
  const players = Object.keys(silhouettes);
  const today = new Date();
  const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  const pseudoRandom = (dayNumber * 9301 + 49297) % 233280;
  const index = pseudoRandom % players.length;
  const randomPlayer = players[index];
  return silhouettes[randomPlayer].default;
};

export const getTodayPlayer = (data, silhouette) => {
  const fileName = silhouette.split("/").pop().split("?")[0];
  return data.find((p) => p.media_silhouette.split(",").includes(fileName));
};

export const slToMedia = (silhouette, media) => {
  const fileName = silhouette.split("/").pop().split("?")[0].replace("_sl", "");
  const path = Object.keys(media).find((m) => m.includes(fileName));
  return media[path]?.default;
};

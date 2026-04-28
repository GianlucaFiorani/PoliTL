import logo from "../assets/achievement/spidyMeM.png";
import speed from "../assets/achievement/speed.png";
import gator from "../assets/achievement/gator.png";
import servito from "../assets/achievement/servito.png";
import jolly from "../assets/achievement/jolly.png";
import sheriff from "../assets/achievement/sheriff.png";

export const winAchievements = (gameStatus, gameStats, ATTEMPS, addNewAch, guesses) => {
  const silhouette = JSON.parse(localStorage.getItem("mod_silhouette")) || {};
  const jumpshot = JSON.parse(localStorage.getItem("mod_jumpshot")) || {};
  const classics = JSON.parse(localStorage.getItem("mod_classics")) || {};

  const winSum = (() => {
    const winSl = silhouette?.gameStats?.winDistribution || [];
    const winJs = jumpshot?.gameStats?.winDistribution || [];
    const winCl = classics?.gameStats?.winDistribution || [];
    const maxLenght = Math.max(winSl.length, winJs.length, winCl.length);
    return Array.from({ length: maxLenght }, (_, index) => (winSl[index] || 0) + (winJs[index] || 0) + (winCl[index] || 0));
  })();

  const endTime = Date.now();
  const secToWin = Math.floor((endTime - gameStatus.startTime) / 1000);

  addNewAch(logo, "First Blood", "Tabellino sverginato tocca portare cibo", "yeah-buddy.mp3");

  guesses.length === 1 && addNewAch(logo, "One Shot", "Sniper vero", "yeah-buddy.mp3");

  guesses.length === ATTEMPS && addNewAch(logo, "Clutch", "Hai rischiato eh", "yeah-buddy.mp3");

  guesses.length === 2 && winSum[1] === 4 && addNewAch(servito, "Servito", "Servitoooooo", "yeah-buddy.mp3");

  if (secToWin < 0) {
    addNewAch(logo, "U fokking cheater", "Stop cheating", "waluigi-everybody-cheater.mp3");
    return gameStatus.startTime + 24 * 60 * 60 * 1000;
  }
  secToWin < 10 && addNewAch(speed, "Speed", "I'm speed", "im-fast-as-f-boy.mp3");

  Math.floor(secToWin / 3600) > 0 && addNewAch(gator, "Gator", "Stai squazzando un po troppo", "toad.mp3");

  return endTime;
};
export const loseAchievements = (gameStatus, mod, addNewAch) => {
  const silhouette = JSON.parse(localStorage.getItem("mod_silhouette")) || {};
  const jumpshot = JSON.parse(localStorage.getItem("mod_jumpshot")) || {};
  const classics = JSON.parse(localStorage.getItem("mod_classics")) || {};

  const getLostGame = (mode) => {
    const win = mode?.gameStats?.winDistribution || [];
    const gamePlayed = mode?.gameStats?.gamePlayed || 0;
    return gamePlayed - win.reduce((acc, valore) => acc + valore, 0);
  };

  const lostSum = getLostGame(silhouette) + getLostGame(jumpshot) + getLostGame(classics);
  const endTime = Date.now();
  const secToWin = Math.floor((endTime - gameStatus.startTime) / 1000);

  addNewAch(jolly, "Jolly", "Hai allertato lo sceriffo, fai ATTENZIONE", "tiinfilo.mp3");
  lostSum === 3 && addNewAch(sheriff, "Poker", "Lo sceriffo cala la sentenza e reclama cibo", "old-west.mp3");
  mod === "classics" && getLostGame(classics) === 2 && addNewAch(sheriff, "Rookie", "Devi essere un Under per non conoscere queste leggende", "old-west.mp3");

  return endTime;
};

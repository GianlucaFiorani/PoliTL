import { BsX } from "react-icons/bs";
import Timer from "./Timer";
import Guesses from "./Guesses";
import { useEffect, useRef, useState } from "react";
import { Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { getTodayPlayer, slToMedia, extractPlayer } from "../utils/todayPlayerUtils";
import Stats from "./Stats";
import Banner from "./Banner";
import { useAchievement } from "./AchievementContex";
import { winAchievements, loseAchievements } from "../utils/achievementUtils";
import { fullScreen } from "../utils/fullScreen";
import time from "../assets/achievement/time.png";

const Game = ({ data, assets, mod, ATTEMPTS, openStats }) => {
  const { isMobile, isLandscape } = fullScreen();
  const isFullScreen = isMobile && isLandscape;
  const { addNewAch } = useAchievement();
  const [todayPlayer] = useState(() => extractPlayer(assets.silhouettes), []);
  const refs = useRef([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");
  const filtered = data.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const today = new Date().toISOString().split("T")[0];
  const storageName = `mod_${mod}`;

  const [gameStatus, setGameStatus] = useState(() => {
    const rowSaved = localStorage.getItem(storageName);
    const saved = rowSaved ? JSON.parse(rowSaved).gameStatus : null;
    if (saved?.startTime > Date.now()) {
      addNewAch(time, "Back To The Future", "Per salvare il Mc dal suolo", "back-to-the-future.mp3");
    }
    return !saved || saved.gameDate !== today
      ? {
          guesses: [],
          gameOver: false,
          startTime: null,
          finishTime: null,
          gameDate: today,
        }
      : saved;
  });
  const guesses = gameStatus.guesses;
  const setGuesses = (newGuess) => {
    setGameStatus((prev) => ({ ...prev, guesses: newGuess }));
  };
  const gameOver = gameStatus.gameOver;

  const [gameStats, setGameStats] = useState(() => {
    const rowSaved = localStorage.getItem(storageName);
    const saved = rowSaved ? JSON.parse(localStorage.getItem(storageName)).gameStats : null;
    return saved
      ? saved
      : {
          gamePlayed: 0,
          winDistribution: new Array(ATTEMPTS).fill(0),
          avgTime: null,
        };
  });

  const winHandler = (lenght, endTime) => {
    setGameStats((prev) => {
      const newDistribution = [...prev.winDistribution];
      newDistribution[lenght]++;
      const newTime = Math.floor((endTime - gameStatus.startTime) / 1000);
      const newAvgTime = prev.avgTime ? (prev.avgTime * prev.gamePlayed + newTime) / (prev.gamePlayed + 1) : newTime;
      return {
        ...prev,
        winDistribution: newDistribution,
        avgTime: newAvgTime,
      };
    });
  };
  const isGameOver = (endTime) => {
    setGameStatus((prev) => ({ ...prev, gameOver: true, finishTime: endTime }));
    setGameStats((prev) => ({ ...prev, gamePlayed: prev.gamePlayed + 1 }));
  };

  const addGuess = (newGuess) => {
    const toGuess = getTodayPlayer(data, todayPlayer);
    if (!toGuess) {
      setErrorMessage("Errore giocatore non trovato");
      return;
    }
    if (guesses.some((p) => p.name === newGuess.name)) {
      setErrorMessage("Hai gia selezionato questo giocatore");
    } else {
      const updateGuess = [...guesses, newGuess];
      setGuesses(updateGuess);
      setSearch("");
      if (newGuess === toGuess) {
        const endTime = winAchievements(gameStatus, gameStats, ATTEMPTS, addNewAch, updateGuess);
        isGameOver(endTime);
        winHandler(updateGuess.length - 1, endTime);
      } else if (updateGuess.length === ATTEMPTS) {
        loseAchievements(gameStatus, mod, addNewAch);
        isGameOver(Date.now());
      }
    }
  };

  useEffect(() => {
    localStorage.setItem(storageName, JSON.stringify({ gameStatus, gameStats }));
  }, [gameStatus, gameStats]);

  useEffect(() => {
    if (guesses) {
      let lastIndex = guesses.length - 1;
      if (gameOver) {
        lastIndex = guesses.lenght;
      }

      refs.current[lastIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [guesses]);
  useEffect(() => {
    if (!errorMessage) return;
    setError(true);
    setTimeout(() => {
      setErrorMessage("");
    }, 6000);
  }, [errorMessage]);

  return (
    <>
      <Banner message={errorMessage} visible={error} closeBanner={() => setError(false)} />
      <div className={`stats-wrapper ${openStats ? "open" : ""}`}>
        <Stats gameStats={gameStats} bg={mod} />
      </div>
      <div
        ref={(el) => {
          if (gameOver) {
            refs.current[guesses.lenght] = el;
          }
        }}
        className="pt-5 d-flex justify-content-center"
      >
        <div className={`my-shadow ${mod === "silhouette" ? "bg-light" : "bg-black "}`} style={mod === "silhouette" ? {} : { width: "85%" }}>
          {mod === "silhouette" ? (
            <img src={gameOver ? slToMedia(todayPlayer, assets.media) : todayPlayer} alt="Mystery player" width={"250px"} height={"250px"} />
          ) : (
            <video
              src={gameOver ? slToMedia(todayPlayer, assets.media) : todayPlayer}
              alt="Mystery player"
              autoPlay
              loop
              muted
              playsInline
              controls
              width={"100%"}
              className={`rounded ${isFullScreen ? "fullscreen" : ""}`}
            />
          )}
        </div>
      </div>

      <div className=" mt-5 d-flex flex-wrap-reverse justify-content-center ">
        <Form
          className={`mb-3 d-flex flex-grow-1 my-btn my-shadow ${focus ? "checked" : gameOver ? "checked disabled" : ""}`}
          onSubmit={(e) => e.preventDefault()}
        >
          <div
            className={`px-3 fw-semibold pt-2 fs-xl border-end border-3 border-black fs-1 lh-1 ${focus ? `bg-${mod} text-shadow text-white` : gameOver ? "bg-body-secondary" : ""}`}
          >
            ?
          </div>
          <Form.Control
            type="text"
            placeholder={gameOver ? "Game Over" : "Indovina giocatore"}
            className="fs-3 border-0 shadow-none chakra-petch"
            value={search}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => setSearch(e.target.value)}
            disabled={gameOver}
          />
          {search && (
            <button className="bg-white border-0 fs-2" onClick={() => setSearch("")}>
              <BsX className="text-shadow" />
            </button>
          )}
        </Form>
        <div className="mb-3 d-flex justify-content-center">
          <button
            className={`mx-3 px-2 fs-2 my-btn my-shadow ${gameOver && "checked disabled bg-body-secondary"}`}
            onClick={() => !gameOver && isGameOver(Date.now())}
          >
            <BsX style={{ fill: "#cf1507", stroke: "#cf1507", strokeWidth: "2" }} />
            Give Up
          </button>
          <div className="px-2 bg-white my-shadow d-flex justify-content-center align-items-center" style={{ fontSize: "2rem", width: "95px" }}>
            <Timer
              saveStart={gameStatus.startTime}
              setStartTime={(time) => setGameStatus((prev) => ({ ...prev, startTime: time }))}
              finishTime={gameStatus.finishTime}
            />
          </div>
        </div>
      </div>
      {search && filtered.length > 0 && (
        <ListGroup className="my-shadow" style={{ maxHeight: "300px", overflowY: "auto" }}>
          {filtered.map((player, index) => (
            <ListGroupItem key={index} className={`fs-3 fw-medium an-bg-${mod}`} onClick={() => addGuess(player)}>
              {player.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
      <Guesses ATTEMPTS={ATTEMPTS} guesses={guesses} todayPlayer={todayPlayer} data={data} gameOver={gameOver} refs={refs} />
    </>
  );
};
export default Game;

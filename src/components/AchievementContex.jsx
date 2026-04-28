import { createContext, useContext, useEffect, useState } from "react";

const AchievementContext = createContext();

export const AchievementProvider = ({ children }) => {
  const storageName = "achievement";

  const playSound = () => {
    const audio = new Audio("/audio/yeah-buddy.mp3");
    audio.play();
  };

  const [achList, setAchList] = useState(() => {
    const saved = localStorage.getItem(storageName);
    return saved ? JSON.parse(saved) : [];
  });

  const [showBanner, setShowBanner] = useState(false);
  const [queue, setQueue] = useState([]);
  const [ach, setAch] = useState({ img: "", title: "", desc: "", sound: "" });
  const [hasNewAch, setHasNewAch] = useState(false);

  const resetHasNewAch = () => setHasNewAch(false);

  const addNewAch = (img, title, desc, sound) => {
    const newAch = { img, title, desc, sound };

    setAchList((prev) => {
      if (prev.some((a) => a.title === title)) return prev;
      setQueue((q) => {
        if (q.some((a) => a.title === title)) return q;
        return [...q, newAch];
      });
      return [...prev, newAch];
    });
  };

  useEffect(() => {
    if (!showBanner && queue.length > 0) {
      const next = queue[0];

      const delay = 400;

      const timer = setTimeout(() => {
        playSound();
        setAch(next);
        setShowBanner(true);
        setHasNewAch(true);
        setQueue((q) => q.slice(1));
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [showBanner, queue]);

  useEffect(() => {
    localStorage.setItem(storageName, JSON.stringify(achList));
  }, [achList]);

  return (
    <AchievementContext.Provider
      value={{
        achList,
        addNewAch,
        showBanner,
        setShowBanner,
        ach,
        hasNewAch,
        resetHasNewAch,
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievement = () => useContext(AchievementContext);

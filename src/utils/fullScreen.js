import { useEffect, useState } from "react";

function getState() {
  const isMobile = window.matchMedia("(max-width: 1024px)").matches;
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;

  return {
    isMobile,
    isLandscape,
  };
}

export const useFullScreen = () => {
  const [state, setState] = useState(getState());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: landscape)");
    const update = () => setState(getState());

    window.addEventListener("resize", update);
    mediaQuery.addEventListener("change", update);

    return () => {
      window.removeEventListener("resize", update);
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  return state;
};

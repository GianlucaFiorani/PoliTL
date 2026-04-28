import { useEffect, useState } from "react";

function getState() {
  return {
    isMobile: window.innerWidth <= 768,
    isLandscape: window.innerWidth > window.innerHeight,
  };
}

export const fullScreen = () => {
  const [state, setState] = useState(getState());

  useEffect(() => {
    const update = () => setState(getState());

    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return state;
};

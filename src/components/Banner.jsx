import { useEffect, useState } from "react";
import { Container, ProgressBar } from "react-bootstrap";

const Banner = ({ message, visible, closeBanner, img, openAch }) => {
  const [barLevel, setBarLevel] = useState(0);
  const handleClose = () => {
    setBarLevel(0);
    closeBanner();
  };

  useEffect(() => {
    if (!visible) return;

    let progress = 0;

    const interval = setInterval(() => {
      progress += 1;
      setBarLevel(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          handleClose();
        }, 500);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [visible]);
  return (
    <Container
      fluid="xl"
      className={`banner ${visible ? "show" : ""}`}
      onClick={() => {
        if (openAch) openAch();
        handleClose();
      }}
    >
      <div className={`${openAch ? "glow" : ""}`}>
        <div className="bg-light my-shadow text-black ">
          <ProgressBar animated variant="danger" now={barLevel} style={{ height: "8px" }} />
          <div className="p-2 d-flex gap-3 justify-content-center align-items-center chakra-petch ">
            {img && <img src={img} alt="Achievement image" width={30} height={30} className="rounded" />}
            <span> {message}</span>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Banner;

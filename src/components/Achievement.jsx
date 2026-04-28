import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import { BsTrophyFill } from "react-icons/bs";
import Banner from "./Banner";
import { useAchievement } from "./AchievementContex";

const Achievement = () => {
  const { achList, showBanner, setShowBanner, ach, hasNewAch, resetHasNewAch } = useAchievement();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(!show);
    resetHasNewAch();
  };

  let currentAudio = null;

  const playSound = (sound) => {
    if (currentAudio) {
      currentAudio.pause();
    }

    currentAudio = new Audio(`/audio/${sound}`);
    currentAudio.play();
  };

  useEffect(() => {
    if (!show) return;
    resetHasNewAch();
  }, [hasNewAch]);

  return (
    <>
      <Banner
        img={ach.img}
        message={ach.title}
        visible={showBanner}
        closeBanner={() => setShowBanner(false)}
        openAch={() => {
          setShow(true);
          resetHasNewAch();
        }}
      />

      <div className={`ach-btn  ${hasNewAch ? "glow" : ""}`}>
        <Button variant="secondary" className="py-2 fs-5  my-shadow" onClick={handleShow}>
          <BsTrophyFill />
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="p-4 my-shadow" style={{ height: "90vh" }}>
          <h1 className="sticky-top">Achievement</h1>

          <ListGroup style={{ height: "90%", overflowY: "auto" }}>
            {[...achList].reverse().map((ach, index) => (
              <ListGroupItem key={index} className="fs-5 fw-medium border-0" onClick={() => playSound(ach.sound)}>
                <div className="my-2 p-3 d-flex my-shadow my-btn text-start align-items-center gap-4" style={{ backgroundColor: "lightyellow" }}>
                  <img src={ach.img} alt="Achievement image" width={80} height={80} className="rounded" />
                  <div>
                    <h2 className="chakra-petch">{ach.title}</h2>
                    <span> {ach.desc}</span>
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Achievement;

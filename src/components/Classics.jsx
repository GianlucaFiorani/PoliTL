import { Container } from "react-bootstrap";
import Header from "./Header";
import Game from "./Game";
import Footer from "./Footer";
import data from "../data/old.json";
import { useState } from "react";

const Classics = () => {
  const ATTEMPTS = 4;
  const [openStats, setOpenStats] = useState(false);
  const silhouettes = import.meta.glob("../assets/classics/video_sl/*.mp4", { eager: true });
  const video = import.meta.glob("../assets/classics/video/*.mp4", { eager: true });
  return (
    <Container fluid="xl" className="px-4">
      <Header openStats={openStats} setOpenStats={() => setOpenStats((prev) => !prev)} />
      <Game data={data} assets={{ silhouettes: silhouettes, media: video }} mod="classics" ATTEMPTS={ATTEMPTS} openStats={openStats} />
      <Footer />
    </Container>
  );
};
export default Classics;

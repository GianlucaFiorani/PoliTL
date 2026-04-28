import { Container } from "react-bootstrap";
import Header from "./Header";
import Game from "./Game";
import Footer from "./Footer";
import data from "../data/silhouette.json";
import { useState } from "react";

const Home = () => {
  const ATTEMPTS = 4;
  const [openStats, setOpenStats] = useState(false);
  const silhouettes = import.meta.glob("../assets/silhouette/portrait_sl/*.png", { eager: true });
  const photos = import.meta.glob("../assets/silhouette/portrait/*.png", { eager: true });
  return (
    <Container fluid="xl" className="px-4">
      <Header openStats={openStats} setOpenStats={() => setOpenStats((prev) => !prev)} />
      <Game data={data} assets={{ silhouettes: silhouettes, media: photos }} mod="silhouette" ATTEMPTS={ATTEMPTS} openStats={openStats} />
      <Footer />
    </Container>
  );
};
export default Home;

import { Col, Container, Row } from "react-bootstrap";
import GuessCell from "./GuessCell";
import { useEffect, useState } from "react";
import { useAchievement } from "./AchievementContex";
import MeM from "../assets/achievement/spidyMeM.png";

const Guesses = ({ ATTEMPTS, guesses, todayPlayer, data, gameOver, refs }) => {
  const { addNewAch } = useAchievement();
  const [closeCount, setCloseCount] = useState([]);
  const plusOne = (newState) => {
    setCloseCount([...newState]);
  };
  useEffect(() => {
    if (closeCount !== 3) return;
    addNewAch(MeM, "Mella o Meller ???", "...", "spiderman.mp3");
  }, [closeCount]);
  return (
    <div className="mt-2 chakra-petch">
      <Container fluid>
        <Row className="fs-4 text-center dashed border-top-0 border-start-0 border-end-0 rounded-0">
          <Col>
            <span> # </span>
          </Col>
          <Col>
            <span> Pos </span>
          </Col>
          <Col>
            <span> Ht </span>
          </Col>
          <Col>
            <span> Età </span>
          </Col>
        </Row>
      </Container>
      {Array.from({ length: ATTEMPTS }).map((_, index) => (
        <div key={index} className={`my-4 fs-3 dashed ${gameOver && "border-secondary"}`} style={{ height: "108px" }}>
          {guesses[index] ? (
            <div ref={(el) => (refs.current[index] = el)} className="px-2 bg-white my-shadow" style={{ height: "108px" }}>
              <Row>
                <div className="mb-2 fs-4 d-flex justify-content-center">{guesses[index].name}</div>
              </Row>
              <Row className="text-center">
                <GuessCell guess={guesses[index]} todayPlayer={todayPlayer} data={data} value="number" />
                <GuessCell guess={guesses[index]} todayPlayer={todayPlayer} data={data} value="role" />
                <GuessCell guess={guesses[index]} todayPlayer={todayPlayer} data={data} value="height" />
                <GuessCell guess={guesses[index]} todayPlayer={todayPlayer} data={data} value="birthday" />
              </Row>
            </div>
          ) : (
            <div className={`fs-2 d-flex justify-content-center align-items-center ${gameOver && "disabled"}`} style={{ height: "inherit" }}>
              {index + 1}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default Guesses;

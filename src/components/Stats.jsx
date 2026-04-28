import { Col, Container, Row } from "react-bootstrap";

const Stats = ({ gameStats, bg }) => {
  const mod = ["mod_silhouette", "mod_jumpshot", "mod_classics"];
  const winDistribution = gameStats.winDistribution;
  const percent = (() => {
    const max = Math.max(...winDistribution);
    return winDistribution.map((win) => (win * 100) / max);
  })();
  const winPercent = (() => {
    let sum = 0;
    winDistribution.forEach((win) => (sum = sum + win));
    const percent = Math.round((sum / gameStats.gamePlayed) * 100);
    return percent ? String(percent) + "%" : "N/A";
  })();
  const avgTime = (() => {
    const seconds = gameStats.avgTime;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.round(seconds % 60);
    return seconds ? String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(secs).padStart(2, "0") : "N/A";
  })();

  return (
    <div className="mt-5 pb-3 stat-content">
      <Container className="d-flex justify-content-center gap-4">
        <div className="p-3 pb-1 my-shadow bg-light flex-grow-1" style={{ maxWidth: "360px", width: "100%" }}>
          <div className=" fs-2 chakra-petch dashed border-top-0 border-start-0 border-end-0 rounded-0 text-center">Win Distribution</div>
          <div className={`my-5 border-bottom border-${bg} border-3`} style={{ height: "150px" }}>
            <Row style={{ height: "100%" }}>
              {Array.from({ length: winDistribution.length }).map((_, index) => (
                <Col key={index}>
                  <div className="px-1 d-flex align-items-end" style={{ height: "100%" }}>
                    <div
                      className={`position-relative bg-${bg} border border-${bg} border-3 border-bottom-0 rounded-top`}
                      style={{ height: `${percent[index]}%`, width: "100%" }}
                    >
                      <span className="fw-medium fs-2 position-absolute" style={{ top: "-13px", left: "50%", transform: "translate(-50%, -50%)" }}>
                        {winDistribution[index]}
                      </span>
                      <span className="fw-medium fs-2 position-absolute" style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}>
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <div className="p-3 my-shadow bg-light flex-grow-1 chakra-petch" style={{ maxWidth: "375px", width: "100%" }}>
          <div>
            <div className="fs-3 text-secondary">Game Played</div>
            <span className="fs-1">{gameStats.gamePlayed}</span>
          </div>
          <div>
            <div className="mt-1 fs-3 text-secondary">Win Percentage</div>
            <span className="fs-1">{winPercent}</span>
          </div>
          <div>
            <div className="mt-1 fs-3 text-secondary">Avarage Time</div>
            <span className="fs-1">{avgTime}</span>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Stats;

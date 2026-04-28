import { Col, Row } from "react-bootstrap";
import logo from "../assets/logo.png";
import hero from "../assets/hero.png";
import { BsBarChartFill, BsBricks, BsHourglassSplit, BsPersonFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ openStats, setOpenStats }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const silhouette = location.pathname === "/";
  const jumpshot = location.pathname === "/jumpshot";
  const classics = location.pathname === "/classics";

  const handleClick = (path) => {
    if (openStats) {
      setOpenStats();
      setTimeout(() => {
        navigate(path);
      }, 200);
    } else {
      navigate(path);
    }
  };
  return (
    <header className="py-3 border-bottom border-3 border-black">
      <Row>
        <Col xs={6}>
          <div className="hero">
            <img src={logo} alt="logo" width={200} />
            <div className="ms-3 fs-2 hero-content">
              <div>
                An
                <a href="https://polisportivagaregnano.it" className="ms-2 ">
                  <img src={hero} alt="hero image" width={150} className="mb-1 pb-1 border-bottom border-black border-3 pop" />
                </a>
              </div>
              <span> player guessing game</span>
            </div>
          </div>
        </Col>
        <Col xs={5} className="ms-auto">
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex flex-grow-1 flex-column gap-3">
              <button className={`px-2 my-btn my-shadow ${openStats && "checked bg-stats text-white text-shadow"}`} onClick={setOpenStats}>
                <BsBarChartFill className="me-1 text-shadow" style={!openStats && { fill: "#1ce91c" }} />
                Stats
              </button>
              <div
                onClick={() => !silhouette && handleClick("/")}
                className={`px-2 my-btn my-shadow ${silhouette && "checked bg-silhouette text-white text-shadow default-cursor"}`}
              >
                <BsPersonFill className="me-1 text-shadow" style={!silhouette && { fill: "#cf1507" }} />
                Silhouette
              </div>
            </div>
            <div className="d-flex flex-grow-1 flex-column gap-3">
              <div
                onClick={() => !jumpshot && handleClick("/jumpshot")}
                className={`px-2 my-btn my-shadow ${jumpshot && "checked bg-jumpshot text-white text-shadow default-cursor"}`}
              >
                <BsBricks className="me-1" />
                Jumpshot
              </div>
              <div
                onClick={() => !classics && handleClick("/classics")}
                className={`px-2 my-btn my-shadow ${classics && "checked bg-secondary text-white text-shadow default-cursor"}`}
              >
                <BsHourglassSplit className="me-1" />
                Classics
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </header>
  );
};
export default Header;

import { Col } from "react-bootstrap";
import { BsArrowDownShort, BsArrowUpShort, BsCheckSquareFill } from "react-icons/bs";
import { getTodayPlayer } from "../utils/todayPlayerUtils";

const GuessCell = ({ guess, todayPlayer, data, value }) => {
  const toGuess = getTodayPlayer(data, todayPlayer)[value];
  const getAge = (birthday) => {
    const age = (new Date() - new Date(birthday)) / (1000 * 60 * 60 * 24 * 365);
    return Math.trunc(age);
  };
  const isEqual = (p1, p2) => {
    const result = [];
    if (p1 === p2) {
      result.push("correct");
    } else if (Math.abs(p1 - p2) <= 5) {
      result.push("close");
    }
    if (value === "role") {
      if (p1.split("/").some((role) => p2.split("/").includes(role))) {
        result.push("close");
      }
    } else {
      if (p1 < p2) {
        result.push("down");
      } else if (p1 > p2) {
        result.push("up");
      }
    }
    return result;
  };
  const todayValue = value === "birthday" ? getAge(toGuess) : toGuess;

  const guessValue = value === "birthday" ? getAge(guess[value]) : guess[value];

  const output = isEqual(todayValue, guessValue);

  return (
    <Col>
      <div className=" d-flex justify-content-center">
        <div className={`px-1 pb-1 fs-6 ${output[0]}`}>
          <span>{guessValue}</span>
          <div className="d-flex justify-content-center">
            {output.includes("up") ? (
              <BsArrowUpShort className="bounce" style={{ animationDirection: "reverse" }} />
            ) : (
              output.includes("down") && <BsArrowDownShort className="bounce" />
            )}
            {output.includes("correct") ? (
              <BsCheckSquareFill className="fs-5" style={{ fill: "#1ce91c" }} />
            ) : (
              output.includes("close") && <div className="px-2 close-icon">~</div>
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};
export default GuessCell;

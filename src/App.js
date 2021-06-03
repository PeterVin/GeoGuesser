import { useEffect, useState } from "react";
import "./App.css";
import OverlayMap from "./components/OverlayMap";
import StreetView from "./components/StreetView";
import Results from "./components/Results";
import { getRandom } from "./utils/mapHelper";
import locations from "./components/locations.json";

const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY_GSW;
  const [positions, setPositions] = useState();

  const [round, setRound] = useState(1);
  const [position, setPosition] = useState();
  const [guessPosition, setGuessPosition] = useState();
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    setPositions(getRandom(locations, 3));
  }, []);

  useEffect(() => {
    if (positions) setPosition(positions[round-1]);
  }, [positions, round]);

  const guess = (_position) => {
    setGuessPosition(_position);
    SetIsModalOpen(true);
  };

  const handleTotalScore = (score) => {
    setTotalScore(totalScore + score);
  };

  return (
    <div className="App">
      {position && positions && (
        <>
          <OverlayMap API_KEY={API_KEY} guess={guess} />
          {position ? (
            <StreetView API_KEY={API_KEY} position={position} />
          ) : null}
          {isModalOpen && (
            <Results
              API_KEY={API_KEY}
              isOpen={isModalOpen}
              round={round}
              handleClose={() => {
                if (round < positions.length) {
                  setPosition(null);
                  setRound(round + 1);
                  SetIsModalOpen(false);
                  
                } else {
                  setPosition(null);
                  setPositions(getRandom(locations, 3));
                  setRound(1);
                  SetIsModalOpen(false);
                }
              }}
              handleRestart={() => {
                setTotalScore(0);
                setPosition(null);
                setRound(null)
                setPositions(getRandom(locations, 3));
                setRound(1);
                SetIsModalOpen(false);
              }}
              guess={guessPosition}
              position={position}
              maxRound={positions.length}
              handleTotalScore={handleTotalScore}
              totalScore={totalScore}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;

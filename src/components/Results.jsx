import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getDistance, getScore } from "../utils/mapHelper";
import GoogleMap from "google-map-react";
import Marker from "./Marker";

const Results = ({
  API_KEY,
  isOpen,
  round,
  handleClose,
  position,
  maxRound,
  guess,
  handleTotalScore,
  totalScore,
  handleRestart,
}) => {
  const { distance, text } = getDistance(position, guess);

  const score = getScore(distance);

  const onClick = () => {
    handleClose();
    handleTotalScore(score);
  };

  const handleGoogleMapApi = (google) => {
    let line = new google.maps.Polyline({
      path: [guess, position],
      strokeColor: "#bd7d33",
      strokeOpacity: 1,
      strokeWeight: 3,
    });
    line.setMap(google.map);
  };
  return (
    <Modal size="lg" show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`3/${round} Results`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Distance: {text}
        <br />
        Score: {score}
        <br />
        Total Score = {totalScore + score}
        {round === maxRound && (
          <div className="final_score">Final Score = {totalScore + score}</div>
        )}
        <br />
        <div className="result_map">
          <GoogleMap
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={{
              lat: (guess.lat + position.lat) / 2,
              lng: (guess.lng + position.lng) / 2,
            }}
            defaultZoom={1}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleGoogleMapApi}
          >
            {guess && (
              <Marker
                lat={guess.lat}
                lng={guess.lng}
                text="Marker"
                isGuess={true}
              />
            )}
            {position && (
              <Marker
                lat={position.lat}
                lng={position.lng}
                text="Marker"
                isGuess={false}
              />
            )}
          </GoogleMap>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClick}>
          {round < maxRound ? "Next" : "New Game"}
        </Button>
        {round < maxRound && (
          <Button variant="danger" onClick={handleRestart}>
            Restart
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Results;

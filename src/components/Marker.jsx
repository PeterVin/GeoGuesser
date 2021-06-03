const Marker = ({ isGuess }) => {
  return (
    <>
      <img
        className="marker"
        src={isGuess ? "marker_person.png" : "marker.png"}
        alt="marker"
      />
    </>
  );
};

export default Marker;

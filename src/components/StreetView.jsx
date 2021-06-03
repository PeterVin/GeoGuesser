import ReactStreetview from "react-streetview";

const StreetView = ({ API_KEY, position }) => {
  const options = {
    position,
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
    disableDefaultUI: true,
  };
  return (
    <>
      {position && (
        <ReactStreetview apiKey={API_KEY} streetViewPanoramaOptions={options} />
      )}
    </>
  );
};

export default StreetView;

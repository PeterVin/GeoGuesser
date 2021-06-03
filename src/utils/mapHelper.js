const rad = (x) => {
  return (x * Math.PI) / 180;
};

export const getDistance = function (p1, p2) {
  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.lng - p1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  let text = "";
  if (d > 1000) {
    text = Math.round(d / 1000) + " km";
  } else {
    text = Math.round(d) + " m";
  }
  return { distance: d, text: text }; // returns the distance in meter
};

export const getRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};


export const getScore = (distance) => {
  return (5000000 - distance) / 1000 > 0 ? Math.round((5000000 - distance) / 1000) : 0;
}

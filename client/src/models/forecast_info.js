// const visibility = {
//   'UN': 'Unknown',
//   'VP': 'Very poor - less than 1 km',
//   'PO': 'Poor - between 1-4 km',
//   'MO': 'Moderate - between 4-10 km',
//   'GO': 'Good - between 10-20 km',
//   'VG': 'Very good - between 20-40 km',
//   'EX': 'Excellent - more than 40 km'
// };

const visibility = {
  'UN': 'Unknown',
  'VP': '< 1km',
  'PO': '1-4km',
  'MO': '4-10km',
  'GO': '10-20km',
  'VG': '20-40km',
  'EX': '> 40km'
};

// const winddir = {
//   'N': 'North',
//   'NNE': 'North-northeast',
//   'NE': 'Northeast',
//   'ENE': 'East-northeast',
//   'E': 'East',
//   'ESE': 'East-southeast',
//   'SE': 'Southeast',
//   'SSE': 'South-southeast',
//   'S': 'South',
//   'SSW': 'South-southwest',
//   'SW': 'Southwest',
//   'WSW': 'West-southwest',
//   'W': 'West',
//   'WNW': 'West-northwest',
//   'NW': 'Northwest',
//   'NNW': 'North-northwest'
// };

const significantWeather = [
  'Clear night',  // 0
  'Sunny day',
  'Partly cloudy (night)',
  'Partly cloudy',
  'Not used',
  'Mist',
  'Fog',
  'Cloudy',
  'Overcast',
  'Light rain shower (night)',
  'Light rain shower',
  'Drizzle',
  'Light rain',
  'Heavy rain shower (night)',
  'Heavy rain shower',
  'Heavy rain',
  'Sleet shower (night)',
  'Sleet shower',
  'Sleet',
  'Hail shower (night)',
  'Hail shower',
  'Hail',
  'Light snow shower (night)',
  'Light snow shower',
  'Light snow',
  'Heavy snow shower (night)',
  'Heavy snow shower',
  'Heavy snow',
  'Thunder shower (night)',
  'Thunder shower',
  'Thunder'
];

// The strength of the sun's ultraviolet (UV) radiation is expressed as a 'Solar UV Index',
// a system developed by the WHO. Met Office forecasts include the effects of:
//   - the position of the sun in the sky;
//   - forecast cloud cover;
//  - ozone amounts in the stratosphere.
// The solar index does not exceed 8 in the UK (8 is rare; 7 may occur on exceptional days,
// mostly inthe two weeks around the summer solstice).
// Indices of 9 and 10 are common in the Mediterranean area.

const low = 'Low exposure. No protection required. You can safely stay outside.';
const moderate = 'Moderate exposure. Seek shade during midday hours, cover up and wear sunscreen.';
const high = 'High exposure. Seek shade during midday hours, cover up and wear sunscreen.';
const veryHigh = 'Very high. Avoid being outside during midday hours. Shirt, sunscreen and hat areessential.';

const UVIndex = [
  "Not used.",  // 0
  low,          // 1
  low,          // 2
  moderate,     // 3
  moderate,     // 4
  moderate,     // 5
  high,         // 6
  high,         // 7
  veryHigh,     // 8
  veryHigh,     // 9
  veryHigh      // 10
];

module.exports = {
  visibility: visibility,
  significantWeather: significantWeather,
  UVIndex: UVIndex
  // winddir: winddir
};

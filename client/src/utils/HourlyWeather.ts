import axios from "axios";

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const getHourlyLocationWeather = async () => {
  let latitude = 37.543561771936005;
  let longitude = 127.07741808265483;
  try {
    const position: Position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=kr&cnt=10`;

    const response = await axios.get(url);

    return response.data;
  }
};

export { getHourlyLocationWeather };

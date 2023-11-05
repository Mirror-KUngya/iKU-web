import { useEffect, useState } from "react";
import { getCurrentLocationWeather } from "../../utils";

const WheatherInfo = () => {
  const [weatherMain, setWeatherMain] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { weather } = await getCurrentLocationWeather();
        setWeatherMain(weather[0].main);
        setWeatherDescription(weather[0].description);
      } catch (error) {}
    };

    fetchWeather();
  }, []);
  return (
    <div>
      <p>{weatherMain}</p>
      <p>{weatherDescription}</p>
    </div>
  );
};

export default WheatherInfo;

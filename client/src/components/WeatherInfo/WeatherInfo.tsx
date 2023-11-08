import { useEffect, useState } from "react";
import { getCurrentLocationWeather } from "../../utils";
import { Container, Icon, Loading, Text } from "./styles";
import { getWeatherIcon } from "../../utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const WheatherInfo = () => {
  const [loading, setLoading] = useState(true);
  const [weatherDescription, setWeatherDescription] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { weather, main } = await getCurrentLocationWeather();
        setLoading(false);
        setWeatherDescription(weather[0].description);
        setIconUrl(getWeatherIcon(weather[0].icon));
        setTemp(main.temp - 273.15);
      } catch (error) {}
    };

    fetchWeather();
  }, []);
  return (
    <Container>
      {loading ? (
        <Loading>
          <AiOutlineLoading3Quarters size={"50px"} />
        </Loading>
      ) : (
        <>
          <Icon src={iconUrl} />
          <Text>
            {temp.toFixed(0)}°C {weatherDescription}
          </Text>
        </>
      )}
    </Container>
  );
};

export default WheatherInfo;

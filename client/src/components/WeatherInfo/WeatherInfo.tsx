import { useEffect, useState } from "react";
import { getCurrentLocationWeather } from "../../utils";
import { Container, Icon, Loading, Text } from "./styles";
import { getWeatherIcon } from "../../utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { patchWeatherCheckList } from "../../hooks/patchWeatherCheckList";

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
        console.log(weather[0].main); // 영어 날씨 -> 체크리스트 기준
        setWeatherDescription(weather[0].description);
        setIconUrl(getWeatherIcon(weather[0].icon));
        setTemp(main.temp - 273.15);
      } catch (error) {}
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    let content = "";
    if (temp >= 28) content = "반팔, 반바지를 추천드려요.";
    else if (temp >= 23) content = "반팔, 얇은 셔츠, 면바지를 추천드려요.";
    else if (temp >= 20) content = "블라우스, 긴팔 티, 면바지를 추천드려요.";
    else if (temp >= 17) content = "얇은 가디건, 스웨터, 긴바지를 추천드려요.";
    else if (temp >= 12) content = "자켓, 가디건, 스웨터, 긴바지를 추천드려요.";
    else if (temp >= 9) content = "잠바, 코트 ,기모바지를 추천드려요.";
    else if (temp >= 5) content = "코트, 발열내의, 가죽 옷, 기모를 추천드려요.";
    else if (temp < 5)
      content = "패딩, 두꺼운 코트, 누빔 옷, 기모, 목도리를 추천드려요.";

    patchWeatherCheckList(content);
  }, [temp]);

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

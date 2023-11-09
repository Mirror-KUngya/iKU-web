import { useEffect, useState } from "react";
import { getHourlyLocationWeather } from "../../utils";
import { Container, Icon, ItemContainer, Loading, Text } from "./styles";
import { getWeatherIcon } from "../../utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import moment from "moment";

type hourlyItem = {
  time: string;
  temp: string;
  imgUrl: string;
};

const HourlyWeather = () => {
  const [loading, setLoading] = useState(true);
  const [hourlyData, setHourlyData] = useState<hourlyItem[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { list } = await getHourlyLocationWeather();
        setLoading(false);

        let temp: hourlyItem[] = [];
        list.forEach((item: any) => {
          const time = moment(item.dt_txt);
          const dayorNight = time.format("a") === "am" ? "오전 " : "오후 ";
          temp.push({
            time: `${dayorNight} ${time.format("h시")}`,
            temp: (item.main.temp - 273.15).toFixed(0),
            imgUrl: getWeatherIcon(item.weather[0].icon),
          });
        });

        setHourlyData(temp);
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
        hourlyData.map((data, idx) => (
          <ItemContainer key={idx}>
            <Text>{data.time}</Text>
            <Icon src={data.imgUrl} />
            <Text>{data.temp}°C</Text>
          </ItemContainer>
        ))
      )}
    </Container>
  );
};

export default HourlyWeather;

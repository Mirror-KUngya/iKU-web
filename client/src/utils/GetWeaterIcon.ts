const getWeatherIcon = (original: string, hour = new Date().getHours()) => {
  const dayOrNight = hour >= 6 && hour <= 18 ? "day" : "night";

  const defaultIcon = `${process.env.PUBLIC_URL}/weatherIcons/weather01.png`;
  const match = original.match(/^(\d+)/);

  if (match) {
    if (dayOrNight === "day") {
      return `${process.env.PUBLIC_URL}/weatherIcons/weather${match[1]}.png`;
    } else {
      if (match[1] === "01") {
        return `${process.env.PUBLIC_URL}/weatherIcons/weather01n.png`;
      } else if (match[1] === "02" || match[1] === "03" || match[1] === "04") {
        return `${process.env.PUBLIC_URL}/weatherIcons/weather02n.png`;
      } else if (match[1] === "09" || match[1] === "10" || match[1] === "11") {
        return `${process.env.PUBLIC_URL}/weatherIcons/weather09n.png`;
      } else if (match[1] === "13") {
        return `${process.env.PUBLIC_URL}/weatherIcons/weather13n.png`;
      } else {
        return `${process.env.PUBLIC_URL}/weatherIcons/weather${match[1]}.png`;
      }
    }
  } else return defaultIcon;
};

export { getWeatherIcon };

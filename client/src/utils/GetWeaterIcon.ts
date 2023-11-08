const getWeatherIcon = (original: string) => {
  const defaultIcon = `${process.env.PUBLIC_URL}/weatherIcons/weather01.png`;
  const match = original.match(/^(\d+)/);

  return match
    ? `${process.env.PUBLIC_URL}/weatherIcons/weather${match[1]}.png`
    : defaultIcon;
};

export { getWeatherIcon };

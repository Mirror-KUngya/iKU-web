import { Description, Title, Image, ImageWrapper } from "./styles";

interface MissionInfoProps {
  title: string;
  description: string;
  images?: string[];
}
const MissionInfo = ({ title, description, images }: MissionInfoProps) => {
  return (
    <>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ImageWrapper>
        {images &&
          images.map((img, idx) => {
            return <Image src={img} key={idx} />;
          })}
      </ImageWrapper>
    </>
  );
};

export default MissionInfo;

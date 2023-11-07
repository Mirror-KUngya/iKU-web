import { useState } from "react";
import { Container } from "../../commonStyles";
import { MissionInfo } from "../../components";
import {
  CountContainer,
  DescriptionContainer,
  TypeText,
  WordContainer,
  WordText,
} from "./styles";

const wordType = {
  제시어: "제시어",
  나의_답: "나의 대답",
};

const WordChainPage = () => {
  const [type] = useState(wordType.제시어);
  const [suggestion] = useState("사과");
  // const [answer] = useState("");
  const [currentCount] = useState(1);
  const GOAL_COUNT = 3;

  return (
    <Container>
      <MissionInfo
        title="끝말잇기"
        description="iKU와 함께하는 끝말잇기 게임!"
      />
      <WordContainer>
        <TypeText>{type}</TypeText>
        <WordText>{suggestion}</WordText>
      </WordContainer>
      <DescriptionContainer>
        <span>{`${suggestion.charAt(suggestion.length - 1)} `}</span>(으)로
        끝나는 단어를 말해주세요!
      </DescriptionContainer>
      <CountContainer>
        {currentCount}/{GOAL_COUNT}
      </CountContainer>
    </Container>
  );
};

export default WordChainPage;

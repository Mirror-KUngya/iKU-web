import { useNavigate } from "react-router-dom";
import {
  Container,
  Description,
  Title,
  Image,
  Button,
  ButtonContainer,
} from "./styles";
import { useState } from "react";
import { AuthInput } from "../../commonStyles";
import { usePostFindId } from "../../hooks/postFindId";

const FindIdPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [showResult, setShowResult] = useState(false);

  const { mutate, data } = usePostFindId(
    userPhone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
  );

  const handleFindId = () => {
    setShowResult(!showResult);
    mutate();
  };

  return (
    <Container>
      {!showResult ? (
        <>
          <Title>아이디 찾기</Title>
          <Description>회원 정보를 입력해주세요.</Description>
          <AuthInput
            placeholder={"이름"}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></AuthInput>
          <AuthInput
            placeholder={"전화번호"}
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          ></AuthInput>
          <Button onClick={handleFindId} style={{ width: "80%" }}>
            찾기
          </Button>
        </>
      ) : (
        <>
          {data ? (
            <>
              <Image src={`${process.env.PUBLIC_URL}/image/check.png`} />
              <Description>
                회원님의 아이디는{"\n"}
                {data} 입니다.
              </Description>
              <ButtonContainer>
                <Button onClick={() => navigate("/login")}>
                  로그인 하러 가기
                </Button>
                <Button onClick={() => navigate("/changePW")}>
                  비밀번호 변경
                </Button>
              </ButtonContainer>
            </>
          ) : (
            <>
              <Image src={`${process.env.PUBLIC_URL}/image/warning.png`} />
              <Description>
                일치하는 회원정보가 없습니다.<br></br>
                <br></br>
                iKU 앱을 통해<br></br>
                회원가입을 진행해주세요.<br></br>
              </Description>
              <Button
                onClick={() => window.history.go(-1)}
                style={{ width: "80%" }}
              >
                이전 페이지로
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default FindIdPage;

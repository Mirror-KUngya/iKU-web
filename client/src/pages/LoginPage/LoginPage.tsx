import { useState } from "react";
import {
  Image,
  Container,
  BottomContainer,
  Input,
  LoginButton,
  ButtonContainer,
  LinkButton,
} from "./styles";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userId, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <Container>
      <Image src={`${process.env.PUBLIC_URL}/logo.png`}></Image>
      <BottomContainer>
        <Input
          placeholder={"아이디 (이메일)"}
          value={userId}
          type="email"
          onChange={(e) => setUserID(e.target.value)}
        ></Input>
        <Input
          placeholder={"비밀번호"}
          type="password"
          value={userId}
          onChange={(e) => setUserID(e.target.value)}
        ></Input>
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
        <ButtonContainer>
          <LinkButton>아이디찾기</LinkButton>
          <LinkButton>|</LinkButton>
          <LinkButton>비밀번호 변경</LinkButton>
        </ButtonContainer>
      </BottomContainer>
    </Container>
  );
};

export default LoginPage;

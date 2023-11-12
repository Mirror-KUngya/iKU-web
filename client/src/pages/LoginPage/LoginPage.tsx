import { useState } from "react";
import {
  Image,
  Container,
  BottomContainer,
  ButtonContainer,
  LinkButton,
} from "./styles";
import { usePostLogin } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { AuthInput, Button } from "../../commonStyles";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userId, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const { mutate } = usePostLogin(userId, password);

  const handleLogin = () => {
    mutate();
  };

  return (
    <Container>
      <Image src={`${process.env.PUBLIC_URL}/logo.png`}></Image>
      <BottomContainer>
        <AuthInput
          placeholder={"아이디"}
          value={userId}
          type="email"
          onChange={(e) => setUserID(e.target.value)}
        ></AuthInput>
        <AuthInput
          placeholder={"비밀번호"}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></AuthInput>
        <Button onClick={handleLogin}>로그인</Button>
        <ButtonContainer>
          <LinkButton onClick={() => navigate("/findId")}>
            아이디찾기
          </LinkButton>
          <LinkButton>|</LinkButton>
          <LinkButton onClick={() => navigate("/changePW")}>
            비밀번호 변경
          </LinkButton>
        </ButtonContainer>
      </BottomContainer>
    </Container>
  );
};

export default LoginPage;

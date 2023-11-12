import { useNavigate } from "react-router-dom";
import { Container, Description, Title, Image } from "./styles";
import { useState } from "react";
import { AuthInput, Button } from "../../commonStyles";
import { usePostChangePW } from "../../hooks";

const ChangePasswordPage = () => {
  const navigate = useNavigate();

  const [Id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showResult, setShowResult] = useState(false);

  const { mutate, data } = usePostChangePW(
    Id,
    phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`),
    newPassword
  );
  const handleFindId = () => {
    mutate();
    setShowResult(!showResult);
  };

  return (
    <Container>
      {!showResult ? (
        <>
          <Title>비밀번호 변경 </Title>
          <Description>회원 정보를 입력해주세요.</Description>
          <AuthInput
            placeholder={"아이디"}
            value={Id}
            onChange={(e) => setId(e.target.value)}
          ></AuthInput>
          <AuthInput
            placeholder={"전화번호"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></AuthInput>
          <AuthInput
            placeholder={"새로운 비밀번호"}
            value={newPassword}
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          ></AuthInput>
          <Button onClick={handleFindId}>변경</Button>
        </>
      ) : (
        <>
          <>
            {data ? (
              <>
                <Image src={`${process.env.PUBLIC_URL}/image/check.png`} />
                <Description>비밀번호가 변경되었습니다.</Description>
                <Button onClick={() => navigate("/login")}>
                  로그인 하러 가기
                </Button>
              </>
            ) : (
              <>
                <Image src={`${process.env.PUBLIC_URL}/image/warning.png`} />
                <Description>
                  일치하는 회원정보가 없습니다.<br></br>
                  <br></br>
                  회원이 아니라면 iKU 앱을 통해<br></br>
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
        </>
      )}
    </Container>
  );
};

export default ChangePasswordPage;

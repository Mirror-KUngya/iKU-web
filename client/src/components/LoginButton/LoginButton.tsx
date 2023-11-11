import { useNavigate } from "react-router-dom";
import { Button } from "./styles";

const LoginButton = () => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate("/login")}>로그인</Button>;
};

export default LoginButton;

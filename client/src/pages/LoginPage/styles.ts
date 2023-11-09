import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20% 0;
`;

export const Image = styled.img`
  width: 60%;
  margin: 20px;
`;

export const BottomContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  margin: 30px auto;
`;

export const Input = styled.input`
  width: 90%;
  padding: 30px;
  margin: 10px 0;
  font-size: 3rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
  border-bottom: 3px solid white;
  color: white;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 500px black inset !important;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  margin: 20px auto;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  padding: 20px;
  border-radius: 20px;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: 1.8rem;
`;

export const LinkButton = styled.button`
  background-color: transparent;
  color: white;
  font-size: 2.2rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
`;

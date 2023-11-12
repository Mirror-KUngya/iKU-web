import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 3rem;
`;

export const MissionStatusText = styled.p`
  font-size: 2.8rem;
`;

export const CurrentStatusText = styled.p`
  font-size: 2.3rem;
  color: lightcoral;
  min-height: 30px;
`;

export const Button = styled.button`
  width: 90%;
  margin: 2rem auto;
  text-align: center;
  font-size: 3.5rem;
  font-weight: bold;
  padding: 1.5rem;
  border-radius: 20px;
  cursor: pointer;
`;

export const AuthInput = styled.input`
  width: 80%;
  padding: 30px;
  margin: 1rem 0;
  font-size: 3.5rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
  border-bottom: 3px solid white;
  color: white;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 500px black inset !important;
  }
`;

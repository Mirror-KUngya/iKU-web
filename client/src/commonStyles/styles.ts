import styled from "styled-components";

export const Conntainer = styled.div`
  text-align: center;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 3rem;
`;

export const Button = styled.div`
  font-size: 1.8rem;
  width: 150px;
  height: 150px;
  padding: 20px;
  margin: 20px auto;
  border-radius: 50%;
  background-color: white;
  text-align: center;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

export const MissionStatusText = styled.p`
  font-size: 2.8rem;
`;

export const CurrentStatusText = styled.p`
  font-size: 2.3rem;
  color: lightcoral;
  min-height: 30px;
`;

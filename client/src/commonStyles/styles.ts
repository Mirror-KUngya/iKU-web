import styled from "styled-components";

export const Conntainer = styled.div`
  text-align: center;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 3rem;
`;

export const Button = styled.button`
  font-size: 1.8rem;
  width: 200px;
  height: 200px;
  padding: 20px;
  margin: 20px;
  border-radius: 50%;
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

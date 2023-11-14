import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 35%;
  align-items: end;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-height: 200px;
`;

export const Icon = styled.img`
  height: 120px;
  margin: 0 30px;
`;

export const Text = styled.p`
  font-size: 3rem;
  font-weight: 900;
  margin: 10px 0 0 0;
  text-align: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  margin: auto;
  svg {
    color: gray;
    animation: ${rotate} 1.5s linear infinite;
  }
`;

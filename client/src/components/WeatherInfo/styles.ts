import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 30%;
  align-items: end;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-height: 180px;
`;

export const Icon = styled.img`
  height: 100px;
`;

export const Text = styled.p`
  font-size: 3rem;
  font-weight: 900;
  margin: 30px 0 0 0;
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

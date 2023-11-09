import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  align-items: end;
  display: flex;
  margin: 0 auto;
  max-height: 220px;
  justify-content: space-between;
`;

export const Icon = styled.img`
  height: 120px;
  width: 120px;
  margin: 10px 0;
`;

export const Text = styled.p`
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  margin: 20px 0 0 0;
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

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 0 auto;
  span {
    font-size: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  svg {
    align-self: center;
  }
`;

export { Container, Title };

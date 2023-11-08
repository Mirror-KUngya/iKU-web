import styled from "styled-components";

const Container = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
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

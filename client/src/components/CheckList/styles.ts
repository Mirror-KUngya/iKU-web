import styled from "styled-components";

const Container = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  display: flex;
  svg {
    align-self: center;
    margin: 0 10px;
  }
`;

export { Container, Title };

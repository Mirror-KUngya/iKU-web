import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  padding: 10px;
  span {
    font-size: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  display: flex;
  svg {
    align-self: center;
    margin-right: 10px;
  }
`;

export { Container, Title };

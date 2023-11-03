import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const Title = styled.h1`
  font-size: 3rem;
`;

const Line = styled.div`
  width: 70%;
  height: 5px;
  margin: 10% 0;
  background-color: lightgray;
`;
export { Container, RowContainer, Title, Line };

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.div`
  text-align: center;
  background-color: white;
  color: black;
  font-size: 1.2rem;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
`;

const HeaderText = styled.h1`
  font-size: 2rem;
  color: gray;
  margin: 30px auto;
`;

const Title = styled.h1`
  font-size: 3rem;

  span {
    font-weight: bold;
    color: lightpink;
  }
`;

const Description = styled.h1`
  font-size: 1.5;
  color: lightblue;
`;

const Line = styled.div`
  width: 80%;
  height: 5px;
  margin: 10% 0;
  background-color: lightgray;
`;
export {
  Container,
  Button,
  RowContainer,
  HeaderText,
  Title,
  Description,
  Line,
};

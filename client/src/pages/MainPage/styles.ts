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
  width: 100%;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  text-align: center;
  span {
    font-weight: bold;
    color: lightpink;
  }
`;

const Description = styled.h1`
  font-size: 2;
  color: lightblue;
`;

const Line = styled.div`
  width: 90%;
  height: 5px;
  margin: 4% 0;
  background-color: gray;
`;

const HideButton = styled.button`
  position: fixed;
  left: 0;
  background-color: transparent;
  cursor: pointer;
  border: none;
  width: 120px;
  height: 50px;
  font-size: 2rem;
  &:hover {
    background-color: gray;
  }
`;

export {
  Container,
  Button,
  RowContainer,
  Title,
  Description,
  Line,
  HideButton,
};

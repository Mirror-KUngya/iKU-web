import styled from "styled-components";

export const ItemContainer = styled.div`
  padding: 10px;
  margin: 10px;
  width: 90%;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-self: center;
  border: 1px white solid;
  border-radius: 20px;
  svg {
    align-self: center;
  }
`;

export const ItemTitle = styled.p`
  margin: 5px;
  padding: 15px;
  font-size: 2.3rem;
  &.done {
    text-decoration: line-through;
    color: gray;
  }
`;

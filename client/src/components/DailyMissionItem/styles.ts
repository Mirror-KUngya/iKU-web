import styled from "styled-components";

export const ItemContainer = styled.div`
  padding: 10px;
  margin: 5px;
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px white solid;
  border-radius: 10px;
`;

export const ItemTitle = styled.p`
  margin: 0;
  padding: 0 5px;
  font-size: 1.5rem;
  &.done {
    text-decoration: line-through;
    color: gray;
  }
`;

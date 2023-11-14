import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 3vh 0;
  height: 90vh;
  flex-direction: column;
  text-align: center;
  & > svg {
    margin: 0 auto;
  }
`;

export const WordContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
`;

export const RecordText = styled.p`
  font-size: 3.5rem;
  margin: 3rem 0;
  color: lightGray;
  span {
    color: lightslategray;
  }
`;

export const TypeText = styled.p`
  font-size: 4.5rem;
  margin: 0;
`;

export const WordText = styled.p`
  font-size: 13rem;
  font-weight: bold;
  margin: 2rem 0;
`;

export const CountContainer = styled.div`
  margin: 3rem 0;
  font-size: 5rem;
  p {
    font-size: 3rem;
  }
`;

export const DescriptionCountContainer = styled.div`
  margin: 2rem 0;
  font-size: 4rem;
`;

export const DescriptionContainer = styled.div`
  margin: 2rem 0;
  font-size: 4rem;
  color: lightpink;
`;

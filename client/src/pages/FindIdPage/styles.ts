import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5% 0;
`;

export const Title = styled.h1`
  font-size: 6rem;
`;

export const Description = styled.p`
  font-size: 4rem;
`;

export const Image = styled.img`
  width: 40%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const Button = styled.button`
  width: 45%;
  font-size: 3.5rem;
  font-weight: bold;
  background-color: white;
  color: black;
  border-radius: 20px;
  padding: 1.5rem 0;
  margin: 3rem 0;
  cursor: pointer;
`;

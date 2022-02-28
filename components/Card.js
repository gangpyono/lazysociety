import React from "react";
import styled from "styled-components";

const Card = ({ id, text }) => {
  return (
    <Container>
      <h3>작성자 : {id}</h3>
      <p>작성 내용 : {text}</p>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid black;
  margin-bottom: 1em;
  padding: 1em 0.5em;
  cursor: pointer;
`;

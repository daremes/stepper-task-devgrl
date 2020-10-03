import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  const history = useHistory();
  return (
    <Container>
      <h1>Home</h1>
      <Button onClick={() => history.push("/subscription")}>Subscribe</Button>
    </Container>
  );
}

const Container = styled.div`
  h1 {
    margin: 64px 0;
  }
`;

const Button = styled.button`
  background-color: #444;
  border: 1px solid #444;
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  color: #fafafa;
  font-size: 16px;
  padding: 8px 12px;
  font-family: inherit;
  text-decoration: none;
  &:hover {
    background-color: #333;
    color: #fafafa;
  }
  &:active {
    position: relative;
    top: 1px;
  }
  &:disabled {
    border: none;
    cursor: not-allowed;
    background-color: transparent;
    color: #777;
  }
`;

import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export default function ThankYou() {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => history.push("/"), 2000);
  }, []);
  return (
    <Container>
      <h1>Thank You etc</h1>
    </Container>
  );
}

const Container = styled.div``;

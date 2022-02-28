import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => <Container>{children}</Container>;

export default Layout;

const Container = styled.div`
  width: 60vw;
  height: 100vh;

  margin: auto;

  padding: 1em;
`;

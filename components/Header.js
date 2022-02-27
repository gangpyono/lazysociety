import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Link from "next/link";
import Router from "next/router";

import { getToken } from "../lib/tokenController";

const Header = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setAccessToken(getToken("accessToken"));
  }, accessToken);

  return (
    <Container>
      {accessToken ? (
        <Button
          onClick={() => {
            Router.push(`/mypage`);
          }}
        >
          마이페이지
        </Button>
      ) : (
        <Link href="/login">
          <Button>로그인</Button>
        </Link>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 5vh;
  background: red;

  display: flex;
  flex-direction: row-reverse;
  padding: 0.5em 0em;
`;

const Button = styled.button`
  margin-left: 0.5em;
`;

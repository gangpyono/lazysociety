import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Link from "next/link";
import { useRouter } from "next/router";
import { getToken } from "../controller/tokenController.js";

const Header = ({ href }) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setAccessToken(getToken("accessToken"));
  }, [accessToken]);

  if (href === "/mypage") {
    return (
      <Container>
        <Link href="/">
          <Button>메인페이지</Button>
        </Link>
      </Container>
    );
  }

  if (href === "/") {
    return (
      <Container>
        {accessToken ? (
          <Button
            onClick={() => {
              router.push(`/mypage`);
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
  }

  return null;
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

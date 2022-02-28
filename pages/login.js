import React, { useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

import Layout from "../components/layout";
import { setToken } from "../controller/tokenController.js";
import { getAuth } from "../lib/auth.js";

const login = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const idRef = useRef(null);
  const passwordRef = useRef(null);

  const signIn = async () => {
    try {
      if (idRef.current.value === "" || passwordRef.current.value === "") {
        alert("아이디 or 패스웨드를 입력해주세요.");
        return;
      }

      const res = await mutate("/api/auth/sign-in", () =>
        getAuth({ id: idRef.current.value, password: passwordRef.current.value })
      );

      setToken("accessToken", res.accessToken);
      setToken("refreshToken", res.refreshToken);

      router.push("/");
    } catch (error) {
      idRef.current.value = "";
      passwordRef.current.value = "";

      alert(error.response.data.msg, "관리자에게 문의하세요.");
    }
  };

  return (
    <Layout>
      <Container>
        <h1>로그인 페이지 </h1>
        <Form>
          <input type="text" placeholder="아이디를 입력하세요" ref={idRef} />
          <input type="text" placeholder="비밀번호를 입력하세요" ref={passwordRef} />
          <button onClick={signIn}>로그인</button>
        </Form>
      </Container>
    </Layout>
  );
};

export default login;

const Container = styled.div`
  text-align: center;
`;

const Form = styled.div`
  height: 20vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  & > input,
  button {
    height: 20%;
  }
`;

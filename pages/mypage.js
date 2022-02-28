import React from "react";
import styled from "styled-components";
import useUser from "../hooks/useUser";

import Header from "../components/Header";
import Layout from "../components/layout";
import { useRouter } from "next/router";

const myPage = () => {
  const router = useRouter();
  const { data, isLoading, error } = useUser();

  if (isLoading) return <h1>...불러오는중</h1>;
  if (error)
    return (
      <h1>
        {error.response.data.msg}
        (관리자에게 문의하세요)
      </h1>
    );

  return (
    <>
      <Header href={router.pathname} />

      <Layout>
        <Container>
          <h1>유저정보</h1>
          <ItemInner>
            <h3>이름 :</h3>
            <span>{data.id}</span>
          </ItemInner>
          <ItemInner>
            <h3>이메일 :</h3>
            <span>{data.email}</span>
          </ItemInner>
          <ItemInner>
            <h3>휴대폰번호 :</h3>
            <span>{data.phone}</span>
          </ItemInner>
          <ItemInner>
            <h3>주소 :</h3>
            <span>{data.address}</span>
          </ItemInner>
        </Container>
      </Layout>
    </>
  );
};

export default myPage;

const Container = styled.div`
  & > h1 {
    text-align: center;
  }
  border: 0.063em solid black;
`;

const ItemInner = styled.div`
  padding: 1em 2em;
  border-top: 0.063em solid black;
  & > h3 {
    display: inline;
  }
`;

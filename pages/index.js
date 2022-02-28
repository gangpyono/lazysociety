import { useRouter } from "next/router";
import React from "react";

import Card from "../components/Card";
import Header from "../components/Header";
import Layout from "../components/layout";

import useUserList from "../hooks/useUserList.js";

const Home = () => {
  const { data, isLoading, error } = useUserList();
  const router = useRouter();
  if (isLoading) return <div>isLoading...</div>;
  if (error) return <h1>{error.response.data.msg}(관리자에게 문의하세요)</h1>;

  return (
    <>
      <Header href={router.pathname} />
      <Layout>
        {data.map((user) => {
          return <Card key={user.id} {...user} />;
        })}
      </Layout>
    </>
  );
};

export default Home;

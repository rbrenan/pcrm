import Layout from "../components/layout";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0/client";
import Profile from "../components/profile";
import React from "react";

export default withPageAuthRequired(function Index() {
  const { user, error, isLoading } = useUser();
  const userContext = {
    user: user,
    error: error,
    isLoading: isLoading,
  };

  let content;
  if (user) {
    content = (
      <Layout userContext={userContext}>
        <Profile userContext={userContext} />
        <div>{JSON.stringify(userContext.user)} </div>
        <ul>
          {/*prefixes.map((prefix) => <li key={prefix.id}>{prefix.prefix}</li>)*/}
        </ul>
      </Layout>
    );
  } else {
    content = <a href="/api/auth/login">Login</a>;
  }

  return <div>{content}</div>;
});

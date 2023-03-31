import React from "react";

export default function Profile({ userContext }) {
  if (userContext.isLoading) return <div>Loading...</div>;
  if (userContext.error) return <div>{error.message}</div>;

  return (
    userContext.user && (
      <div>
        <img src={userContext.user.picture} alt={userContext.user.name} />
        <h2>{userContext.user.name}</h2>
        <p>{userContext.user.email}</p>
      </div>
    )
  );
}

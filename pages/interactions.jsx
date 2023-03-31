import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import React, { useReducer, useState } from "react";
import { getInteractions } from "../lib/prisma";
import PropTypes from "prop-types";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      companyName: "",
    };
  }

  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function Interactions(props) {
  const userContext = {
    user: props.user,
  };

  //const [formData, setFormData] = useReducer(formReducer, {});
  //const [submitting, setSubmitting] = useState(false);
  /*
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const interaction = {
      companyName: formData.companyName,
    };

    setTimeout(() => {
      setSubmitting(false);
      setFormData({
        reset: true,
      });
    }, 3000);
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };
*/
  return (
    <Layout userContext={userContext}>
      <div>
        <h1>Add interaction</h1>
        {submitting ? (
          <div>Submitting...</div>
        ) : (
          /*<form onSubmit={handleSubmit}>*/
          <form method="POST" action="/api/interaction">
            <fieldset>
              <label>
                <p>Company name</p>
                <input
                  name="companyName"
                  value={formData.companyName || ""}
                  onChange={handleChange}
                />
              </label>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        )}
        <br />
        <h1>Companies</h1>
        <ul>
          {props.interactions.map((interaction) => (
            <li key={interaction.interactionId}>{interaction.interactionId}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

Interactions.propTypes = {
  user: PropTypes.Node,
  interactions: PropTypes.arrayOf(PropTypes.object),
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);

    const companies = await getInteractions(session.user.sub);
    return {
      props: {
        companies: companies,
      },
    };
  },
});

import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import React, { useReducer, useState } from "react";
import { getPrefixes, getSuffixes } from "../lib/prisma";
import PropTypes from "prop-types";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      prefix: "",
      suffix: "",
    };
  }

  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function Admin(props) {
  const userContext = {
    user: props.user,
  };

  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const person = {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
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

  return (
    <Layout userContext={userContext}>
      <div>
        <h1>Add Prefix</h1>
        {submitting ? (
          <div>Submitting...</div>
        ) : (
          /*<form onSubmit={handleSubmit}>*/
          <form method="POST" action="/api/prefix">
            <fieldset>
              <label>
                <p>Prefix</p>
                <input
                  name="prefix"
                  value={formData.prefix || ""}
                  onChange={handleChange}
                />
              </label>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        )}
        <br />
        <h1>Prefixes</h1>
        <ul>
          {props.prefixes.map((prefix) => (
            <li key={prefix.prefixId}>{prefix.prefix}</li>
          ))}
        </ul>

        <h1>Add Suffix</h1>
        {submitting ? (
          <div>Submitting...</div>
        ) : (
          /*<form onSubmit={handleSubmit}>*/
          <form method="POST" action="/api/suffix">
            <fieldset>
              <label>
                <p>Suffix</p>
                <input
                  name="suffix"
                  value={formData.suffix || ""}
                  onChange={handleChange}
                />
              </label>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        )}
        <br />
        <h1>Suffixes</h1>
        <ul>
          {props.suffixes.map((suffix) => (
            <li key={suffix.suffixId}>{suffix.suffix}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

Admin.propTypes = {
  user: PropTypes.Node,
  prefixes: PropTypes.arrayOf(PropTypes.object),
  suffixes: PropTypes.arrayOf(PropTypes.object),
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);

    const prefixes = await getPrefixes(session.user.sub);
    const suffixes = await getSuffixes(session.user.sub);
    return {
      props: {
        prefixes: prefixes,
        suffixes: suffixes,
      },
    };
  },
});

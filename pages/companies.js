import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import React, { useReducer, useState } from "react";
import { getCompanies } from "../lib/prisma";
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

export default function Companies(props) {
  const userContext = {
    user: props.user,
  };

  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const company = {
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

  return (
    <Layout userContext={userContext}>
      <div>
        <h1>Add company</h1>
        {submitting ? (
          <div>Submitting...</div>
        ) : (
          /*<form onSubmit={handleSubmit}>*/
          <form method="POST" action="/api/company">
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
          {props.companies.map((company) => (
            <li key={company.companyId}>{company.companyName}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

Companies.propTypes = {
  user: PropTypes.Node,
  people: PropTypes.arrayOf(PropTypes.object),
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    console.log(ctx);
    const session = await getSession(ctx.req, ctx.res);
    console.log(session);
    const companies = await getCompanies(session.user.sub);
    return {
      props: {
        companies: companies,
      },
    };
  },
});

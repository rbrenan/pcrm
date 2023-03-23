import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import React, { useReducer, useState } from "react";
import { getPeople } from "../lib/prisma";
import PropTypes from "prop-types";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      firstName: "",
      middleName: "",
      lastName: "",
    };
  }

  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function People(props) {
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
        <h1>Add person</h1>
        {submitting ? (
          <div>Submitting...</div>
        ) : (
          /*<form onSubmit={handleSubmit}>*/
          <form method="POST" action="/api/person">
            <fieldset>
              <label>
                <p>First name</p>
                <input
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>Middle name</p>
                <input
                  name="middleName"
                  value={formData.middleName || ""}
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>Last name</p>
                <input
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                />
              </label>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        )}
        <br />
        <h1>People</h1>
        <ul>
          {props.people.map((person) => (
            <li key={person.personId}>
              {person.firstName} {person.middleName} {person.lastName}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

People.propTypes = {
  user: PropTypes.Node,
  people: PropTypes.arrayOf(PropTypes.object),
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    console.log(ctx);
    const session = await getSession(ctx.req, ctx.res);
    console.log(session);
    const people = await getPeople(session.user.sub);
    return {
      props: {
        people: people,
      },
    };
  },
});

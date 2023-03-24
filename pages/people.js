import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import React, { useReducer, useState } from "react";
import { getPeople, getPrefixes, getSuffixes } from "../lib/prisma";
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
                <p>Prefix</p>
                {/*<input
                  name="prefix"
                  value={formData.prefix || ""}
                  list="prefixes"
                  onChange={handleChange}
                />
                <datalist id="prefixes">
                  {props.prefixes.map((prefix) => (
                    <option key={prefix.prefixId} value={prefix.prefix} />
                  ))}
                  </datalist>*/}
                <select name="prefixId">
                  <option value="">--Prefix--</option>
                  {props.prefixes.map((prefix) => (
                    <option key={prefix.prefixId} value={prefix.prefixId}>
                      {prefix.prefix}
                    </option>
                  ))}
                </select>
              </label>
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
              <label>
                <p>Suffix</p>
                <select name="suffixId">
                  <option value="">--Suffix--</option>
                  {props.suffixes.map((suffix) => (
                    <option key={suffix.suffixId} value={suffix.suffixId}>
                      {suffix.suffix}
                    </option>
                  ))}
                </select>
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
              {/*JSON.stringify(person)*/} {person.prefix?.prefix}{" "}
              {person.firstName} {person.middleName} {person.lastName}{" "}
              {person.suffix?.suffix}
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
  prefixes: PropTypes.arrayOf(PropTypes.object),
  suffixes: PropTypes.arrayOf(PropTypes.object),
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);

    const people = await getPeople(session.user.sub);
    const prefixes = await getPrefixes(session.user.sub);
    console.log("=================");
    console.log(JSON.stringify(people));
    console.log("=================");
    console.log(JSON.stringify(prefixes));
    const suffixes = await getSuffixes(session.user.sub);
    return {
      props: {
        people: people,
        prefixes: prefixes,
        suffixes: suffixes,
      },
    };
  },
});

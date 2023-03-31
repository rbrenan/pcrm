import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Layout from "../../components/layout";
import { getPerson, getPrefixes, getSuffixes } from "../../lib/prisma";
import React, { useReducer } from "react";
import { useSWR } from "swr";

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      prefixId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      suffixId: "",
    };
  }

  return {
    ...state,
    [event.name]: event.value,
  };
};



export default function Person(props) {
  const userContext = {
    user: props.user,
  };

  const [formData, setFormData] = useReducer(formReducer, props.personData);

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/people/${encodeURIComponent(formData.personId)}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(formData)
    });
    
  };

  return (
    <Layout userContext={userContext}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          {/*<input name="personId" type="hidden" value={formData.pesonId} />*/}
          <label>
            <p>Prefix {formData.prefixId}</p>
            <select name="prefixId" onChange={handleChange}>
              <option value="" selected={(!formData.prefix)}>
                --Prefix--
              </option>
              {props.prefixes?.map((prefix) => (
                <option
                  key={prefix.prefixId}
                  value={prefix.prefixId}
                  selected={(formData.prefixId = prefix.prefixId)}
                >
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
            <select name="suffixId" onChange={handleChange}>
              <option value="" selected={(!formData.suffixId)}>
                --Suffix--
              </option>
              {props.suffixes?.map((suffix) => (
                <option
                  key={suffix.suffixId}
                  value={suffix.suffixId}
                  selected={(formData.suffixId = suffix.suffixId)}
                >
                  {suffix.suffix}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    console.log(ctx);

    const session = await getSession(ctx.req, ctx.res);

    const personData = await getPerson(ctx.query.personId);

    const prefixes = await getPrefixes(session.user.sub);
    const suffixes = await getSuffixes(session.user.sub);
    console.log(personData);
    return {
      props: {
        personData: personData,
        prefixes: prefixes,
        suffixes: suffixes,
      },
    };
  },
});

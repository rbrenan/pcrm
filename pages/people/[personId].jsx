import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Layout from "../../components/layout";
import { getPerson, getPrefixes, getSuffixes } from "../../lib/prisma";
import React, { useReducer } from "react";
import {
  TextField,
  Button,
  Container,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";

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
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  return (
    <Layout userContext={userContext}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <Select
            name="prefixId"
            value={formData.prefixId}
            label="Prefix"
            onChange={handleChange}
            sx={{ mb: 4 }}
          >
            <MenuItem key="" value={null}>
              ---Prefix---
            </MenuItem>
            {props.prefixes?.map((prefix) => (
              <MenuItem key={prefix.prefixId} value={prefix.prefixId}>
                {prefix.prefix}
              </MenuItem>
            ))}
          </Select>
          <TextField
            name="firstName"
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            onChange={handleChange}
            value={formData.firstName}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <TextField
            name="middleName"
            type="text"
            variant="outlined"
            color="secondary"
            label="Middle Name"
            onChange={handleChange}
            value={formData.middleName}
            fullWidth
            sx={{ mb: 4 }}
          />
          <TextField
            name="lastName"
            type="text"
            variant="outlined"
            color="secondary"
            label="Last Name"
            onChange={handleChange}
            value={formData.lastName}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <Select
            name="suffixId"
            value={formData.suffixId}
            label="Suffix"
            onChange={handleChange}
            sx={{ mb: 4 }}
          >
            <MenuItem key="" value={null}>
              ---Suffix---
            </MenuItem>
            {props.suffixes?.map((suffix) => (
              <MenuItem key={suffix.suffixId} value={suffix.suffixId}>
                {suffix.suffix}
              </MenuItem>
            ))}
          </Select>
        </fieldset>
        <Button type="submit" sx={{ m: 2 }}>
          Submit
        </Button>
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

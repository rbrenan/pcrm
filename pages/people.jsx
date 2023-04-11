import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import React, { useReducer, useState } from "react";
import { getPeople, getPrefixes, getSuffixes } from "../lib/prisma";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Button,
  Container,
  Stack,
  Select,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
} from "@mui/material";
import { FormatBold } from "@mui/icons-material";

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
  const [openPopup, setOpenPopup] = useState(false);

  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/people/`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    refreshData();
    setOpenPopup(false);
  };
  /*const handleSubmit = (event) => {
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
*/

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const peopleRows = props.people.map((person) => ({
    id: person.personId,
    prefix: person.prefix?.prefix,
    firstName: person.firstName,
    middleName: person.middleName,
    lastName: person.lastName,
    suffix: person.suffix?.suffix,
    edit: person.personId,
    delete: person.personId,
  }));

  const peopleCols = [
    {
      field: "prefix",
      headerName: "Prefix",
      width: 70,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
    },
    {
      field: "middleName",
      headerName: "Middle Name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
    },
    {
      field: "suffix",
      headerName: "Suffix",
      width: 70,
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link href={`/people/${encodeURIComponent(params.value)}`} passHref>
            <Button>Edit</Button>
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            href={{
              pathname: `/api/people/${encodeURIComponent(params.value)}`,
              query: { delete: 1 },
            }}
            passHref
          >
            <Button>Delete</Button>
          </Link>
        );
      },
    },
  ];

  return (
    <Layout userContext={userContext}>
      <div>
        {/*
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Add person
  </Typography>*/}
        <Button
          onClick={() => {
            setOpenPopup(true);
          }}
        >
          Add Person
        </Button>
        <br />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          People
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={peopleRows}
            columns={peopleCols}
            checkboxSelection
            density="compact"
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "secondary",
                color: "secondary",
                fontSize: 16,
                fontWeight: "bold",
              },
            }}
          />
        </div>
      </div>
      <Dialog open={openPopup}>
        <DialogTitle>Add Person</DialogTitle>
        <DialogContent>
          <form method="POST" onSubmit={handleSubmit}>
            <fieldset>
              <Stack
                spacing={2}
                direction="row"
                sx={{ marginBottom: 4, marginTop: 4 }}
              >
                <InputLabel id="prefix-label">Prefix</InputLabel>
                <Select
                  name="prefixId"
                  value={formData.prefixId}
                  label="Prefix"
                  labelId="prefix-label"
                  onChange={handleChange}
                  sx={{ mb: 4 }}
                >
                  <MenuItem key="" value="">
                    ---Prefix---
                  </MenuItem>
                  {props.prefixes?.map((prefix) => (
                    <MenuItem key={prefix.prefixId} value={prefix.prefixId}>
                      {prefix.prefix}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              <TextField
                name="firstName"
                type="text"
                variant="outlined"
                color="secondary"
                label="First Name"
                width="30%"
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
                sx={{ mb: 4, width: 500 }}
              />
              <TextField
                name="lastName"
                type="text"
                variant="outlined"
                color="secondary"
                label="Last Name"
                width="30%"
                onChange={handleChange}
                value={formData.lastName}
                fullWidth
                required
                sx={{ mb: 4 }}
              />
              <Stack
                spacing={2}
                direction="row"
                sx={{ marginBottom: 4, marginTop: 4 }}
              >
                <InputLabel id="suffix-label">Suffix</InputLabel>
                <Select
                  name="suffixId"
                  value={formData.suffixId}
                  label="Suffix"
                  labelId="suffix-label"
                  width="10%"
                  onChange={handleChange}
                  sx={{ mb: 4 }}
                >
                  <MenuItem key="" value="">
                    ---Suffix---
                  </MenuItem>
                  {props.suffixes?.map((suffix) => (
                    <MenuItem key={suffix.suffixId} value={suffix.suffixId}>
                      {suffix.suffix}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </fieldset>
            <Button type="submit" variant="contained" sx={{ m: 2 }}>
              Submit
            </Button>
          </form>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenPopup(false);
            }}
            sx={{ m: 2 }}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
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

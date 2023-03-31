import { createUser, createPerson } from "../../../lib/prisma";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
//import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function handler(req, res) {
  //
  //console.log(req);
  // Build the user object

  //console.log(JSON.stringify(body));

  if (req.method === "POST") {
    // Get the logged in user
    const { user } = await getSession(req, res);

    // Make sure the logged in user exists in the user table
    const curUser = await createUser(user);
    console.log(curUser);

    req.body.userId = user.sub;

    // Validate the person object
    if (!req.body.firstName || !req.body.lastName) {
      // HTTP bad request error code
      return res.status(400).json({ data: "First and last name are required" });
    }

    // Insert new person into the database and redirect to people page
    const newPerson = await createPerson(req.body);
    console.log(
      `Created Person ${newPerson.personId}: ${newPerson.firstName} ${newPerson.lastName}`
    );
    //return res.redirect("/people?success=true").toString();

    return res.status(201).json({ data: newPerson });
  }
});

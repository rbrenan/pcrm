import { createUser, createPrefix } from "../../lib/prisma";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
//import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function handler(req, res) {
  // Get the logged in user
  const { user } = await getSession(req, res);

  // Make sure the logged in user exists in the user table
  const curUser = await createUser(user);
  console.log(curUser);

  // Build the user object
  req.body.userId = user.sub;
  const body = req.body;

  console.log(JSON.stringify(body));

  // Validate the user object
  if (!body.prefix) {
    // HTTP bad request error code
    return res.status(400).json({ data: "Prefix is required" });
  }

  // Insert new person into the database and redirect to people page
  const newPrefix = await createPrefix(req.body);
  console.log(JSON.stringify(newPrefix));
  return res.redirect("/admin?success=true").toString();
});

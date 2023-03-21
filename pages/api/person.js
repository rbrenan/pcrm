import { createPerson } from "../../lib/prisma";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
//import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  req.body.user_id = user.sub;
  const body = req.body;

  console.log(JSON.stringify(body));

  if (!body.first_name || !body.last_name) {
    // HTTP bad request error code
    return res.status(400).json({ data: "First and last name are required" });
  }

  const newPerson = await createPerson(req.body);
  console.log(JSON.stringify(newPerson));
  return res.redirect("/people?success=true").toString();
});

import { updatePerson } from "../../../lib/prisma";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  console.log("persondId route");

  if (req.method === "PUT") {
    //console.log("BODY: " + JSON.stringify(req.body));
    // Validate the person object
    if (!req.body.firstName || !req.body.lastName) {
      // HTTP bad request error code
      return res.status(400).json({ data: "First and last name are required" });
    }
    //console.log("about to update person");
    const modifiedPerson = await updatePerson(req.body);
    return res.status(200).json({ data: modifiedPerson });
  }
});

import { deletePerson, updatePerson } from "../../../lib/prisma";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  console.log("persondId route");
  console.log(JSON.stringify(req.query));
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
  } else if (req.query.delete === "1") {
    console.log("deleting");
    await deletePerson(req.query.personId);
    return (
      res
        /*.status(200)
      .json({ data: `Deleted person ${req.query.personId}` })*/
        .redirect("/people")
    );
  }
});

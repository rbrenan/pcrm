//const { PrismaClient } = require('@prisma/client')
import { prisma } from "./db";
import { stringify, v4 as uuidV4, parse } from "uuid";

//const prisma = new PrismaClient()

export async function getPrefixes() {
  const allPrefixes = await prisma.prefix.findMany(); /*.then(async () => {
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
      })*/

  return allPrefixes.map((prefix) => {
    return {
      id: stringify(prefix.prefix_id),
      prefix: prefix.prefix,
    };
  });
}

export async function getPeople(userId) {
  const allPeople = await prisma.person.findMany({
    where: {
      user_id: {
        equals: userId,
      },
    },
  });

  return allPeople.map((person) => {
    return {
      id: stringify(person.person_id),
      firstName: person.first_name,
      middleName: person.middle_name,
      lastName: person.last_name,
    };
  });
}

export async function createPerson(person) {
  console.log(
    JSON.stringify({
      data: {
        person_id: parse(uuidV4())
          .map((intVal) => intVal.toString(2))
          .join(""),
        ...person,
      },
    })
  );

  var uuid = uuidV4();
  let buf = Buffer.from(parse(uuid));
  console.log(uuid);
  console.log(parse(uuid));
  console.log(uuid.replace("-", ""));
  console.log(buf);

  const newPerson = await prisma.person.create({
    data: {
      person_id: buf,
      ...person,
    },
  });

  return newPerson;
}

/*
export async function saveUser(user_id) {
    const user_Id = await prisma.user.upsert({
        create: {
          user_id: user_id,
        },
      })
}*/

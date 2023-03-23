//const { PrismaClient } = require('@prisma/client')
import { prisma } from "./db";
import { stringify, v4 as uuidV4, parse } from "uuid";

//const prisma = new PrismaClient()

export async function createUser(user) {
  return await prisma.user.upsert({
    where: {
      userId: user.sub,
    },
    update: {},
    create: {
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      userId: user.sub,
    },
  });
}

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
      id: stringify(prefix.prefixId),
      prefix: prefix.prefix,
    };
  });
}

export async function getPeople(userId) {
  const allPeople = await prisma.person.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  });

  return allPeople.map((person) => {
    return {
      id: stringify(person.personId),
      firstName: person.firstName,
      middleName: person.middleName,
      lastName: person.lastName,
    };
  });
}

export async function createPerson(person) {
  console.log(
    JSON.stringify({
      data: {
        personId: parse(uuidV4())
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
      personId: buf,
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

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

// People
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

// Companies
export async function getCompanies(userId) {
  const allCompanies = await prisma.company.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  });

  return allCompanies.map((company) => {
    return {
      id: stringify(company.companyId),
      companyName: company.companyName,
    };
  });
}

export async function createCompany(company) {
  console.log(
    JSON.stringify({
      data: {
        companyId: parse(uuidV4())
          .map((intVal) => intVal.toString(2))
          .join(""),
        ...company,
      },
    })
  );

  var uuid = uuidV4();
  let buf = Buffer.from(parse(uuid));

  const newCompany = await prisma.company.create({
    data: {
      companyId: buf,
      ...company,
    },
  });

  return newCompany;
}

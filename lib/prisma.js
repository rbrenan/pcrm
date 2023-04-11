import { prisma } from "./db";
import { stringify, v4 as uuidV4, parse } from "uuid";

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

export async function getPrefixes(userId) {
  const allPrefixes = await prisma.prefix.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  }); /*.then(async () => {
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
      })*/

  return allPrefixes.map((prefix) => {
    return {
      prefixId: stringify(prefix.prefixId),
      prefix: prefix.prefix,
    };
  });
}

export async function createPrefix(prefix) {
  var uuid = uuidV4();
  let buf = Buffer.from(parse(uuid));

  const newPrefix = await prisma.prefix.create({
    data: {
      prefixId: buf,
      ...prefix,
    },
  });

  return newPrefix;
}

export async function getSuffixes(userId) {
  const allSuffixes = await prisma.suffix.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  }); /*.then(async () => {
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
      })*/
  console.log(allSuffixes);
  return allSuffixes.map((suffix) => {
    return {
      suffixId: stringify(suffix.suffixId),
      suffix: suffix.suffix,
    };
  });
}

export async function createSuffix(suffix) {
  var uuid = uuidV4();
  let buf = Buffer.from(parse(uuid));

  const newSuffix = await prisma.suffix.create({
    data: {
      suffixId: buf,
      ...suffix,
    },
  });

  return newSuffix;
}

// ==================
// ===== People =====
// ==================

// Get all people associated with a userId
export async function getPeople(userId) {
  const allPeople = await prisma.person.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
    include: {
      prefix: true,
      suffix: true,
    },
  });
  //console.log(JSON.stringify(allPeople));
  return allPeople.map((person) => {
    return {
      personId: stringify(person.personId),
      firstName: person.firstName,
      middleName: person.middleName,
      lastName: person.lastName,
      prefix: person.prefix
        ? {
            prefixId: stringify(person.prefix.prefixId),
            prefix: person.prefix.prefix,
          }
        : null,
      suffix: person.suffix
        ? {
            suffixId: stringify(person.suffix.suffixId),
            suffix: person.suffix.suffix,
          }
        : null,
    };
  });
}

// Get a person by Id
export async function getPerson(personId) {
  const myPerson = await prisma.person.findUnique({
    where: {
      personId: Buffer.from(parse(personId)),
    },
    include: {
      prefix: true,
      suffix: true,
    },
  });
  //console.log(JSON.stringify(allPeople));
  return {
    personId: stringify(myPerson.personId),
    firstName: myPerson.firstName,
    middleName: myPerson.middleName,
    lastName: myPerson.lastName,
    prefixId: myPerson.prefix ? stringify(myPerson.prefix.prefixId) : null,
    prefix: myPerson.prefix
      ? {
          prefixId: stringify(myPerson.prefix.prefixId),
          prefix: myPerson.prefix.prefix,
        }
      : null,
    suffixId: myPerson.suffix ? stringify(myPerson.suffix.suffixId) : null,
    suffix: myPerson.suffix
      ? {
          suffixId: stringify(myPerson.suffix.suffixId),
          suffix: myPerson.suffix.suffix,
        }
      : null,
  };
}

export async function createPerson(person) {
  var uuid = uuidV4();
  const buf = Buffer.from(parse(uuid));

  try {
    const prefixId = Buffer.from(parse(person.prefixId));
    person.prefixId = prefixId;
  } catch {
    person.prefixId = null;
  }

  try {
    const suffixId = Buffer.from(parse(person.suffixId));
    person.suffixId = suffixId;
  } catch {
    person.suffixId = null;
  }

  const newPerson = await prisma.person.create({
    data: {
      personId: buf,
      ...person,
    },
  });

  return newPerson;
}

export async function updatePerson(person) {
  try {
    const personId = Buffer.from(parse(person.personId));
    person.personId = personId;
  } catch {
    console.error("Invalid Person Id");
  }

  try {
    const prefixId = Buffer.from(parse(person.prefixId));
    person.prefixId = prefixId;
  } catch {
    person.prefixId = null;
  }

  try {
    const suffixId = Buffer.from(parse(person.suffixId));
    person.suffixId = suffixId;
  } catch {
    person.suffixId = null;
  }

  const modifiedPerson = await prisma.person.update({
    where: {
      personId: person.personId,
    },
    data: {
      firstName: person.firstName,
      middleName: person.middleName,
      lastName: person.lastName,
      prefixId: person.prefixId,
      suffixId: person.suffixId,
    },
  });

  return modifiedPerson;
}

export async function deletePerson(personId) {
  let delPersonId;
  try {
    delPersonId = Buffer.from(parse(personId));
  } catch {
    console.error("Invalid Person Id");
  }

  return await prisma.person.delete({
    where: {
      personId: delPersonId,
    },
  });
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

// Interactions
export async function getInteractions(userId) {
  const allInteractions = await prisma.interaction.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  });

  return allInteractions.map((interaction) => {
    return {
      id: stringify(interaction.interactionId),
      //companyName: company.companyName,
    };
  });
}

export async function createInteraction(interaction) {
  var uuid = uuidV4();
  let buf = Buffer.from(parse(uuid));

  const newInteraction = await prisma.interaction.create({
    data: {
      interactionId: buf,
      ...interaction,
    },
  });

  return newInteraction;
}

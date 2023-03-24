import { prisma } from "./db";
import { stringify, v4 as uuidV4, parse } from "uuid";
import { string } from "prop-types";

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
      id: stringify(person.personId),
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

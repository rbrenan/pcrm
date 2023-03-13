const { PrismaClient } = require('@prisma/client')
var uuid = require('node-uuid');

const prisma = new PrismaClient()

export async function getPrefixes() {

console.log("getting prefixes");
    const allPrefixes = await prisma.prefix.findMany()/*.then(async () => {
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
      })*/;


  console.log("got prefixes");
/*console.log(allPrefixes.map((prefix) => { 
    return {
        id: uuid.unparse(prefix.prefix_id),
        prefix: prefix.prefix}
}));*/
    return allPrefixes.map((prefix) => { 
        return {
            id: uuid.unparse(prefix.prefix_id),
            prefix: prefix.prefix
        }
    });

}

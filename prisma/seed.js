const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.userLanguage.deleteMany();

  const users = [
    { name: "Alice", email: "alice@example.com", languages: "English,French", age: 25 },
    { name: "Bob", email: "bob@example.com", languages: "Spanish,English", age: 30 },
    { name: "Charlie", email: "charlie@example.com", languages: "German", age: 22 },
    { name: "Diana", email: "diana@example.com", languages: "English,Italian", age: 28 },
    { name: "Ethan", email: "ethan@example.com", languages: "French", age: 35 },
    { name: "Fiona", email: "fiona@example.com", languages: "English,Spanish", age: 27 },
    { name: "George", email: "george@example.com", languages: "Portuguese", age: 29 },
    { name: "Hannah", email: "hannah@example.com", languages: "English", age: 24 },
    { name: "Ian", email: "ian@example.com", languages: "French,German", age: 31 },
    { name: "Julia", email: "julia@example.com", languages: "Spanish,Italian", age: 26 },
  ];

  for (const user of users) {
    await prisma.userLanguage.create({ data: user });
  }

  console.log("Seed data inserted");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
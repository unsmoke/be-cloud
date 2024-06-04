import seedItems from "./itemSeeder.mjs";

const seed = async () => {
  await seedItems();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

// Run the seeder
// $ node -r esm prisma/seeder/index.mjs
//
// If you see the following output, the seeder has run successfully:
// Prisma Client is ready
// Prisma Client is ready

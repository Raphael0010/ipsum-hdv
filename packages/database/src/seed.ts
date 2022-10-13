import { prisma } from '.';

import type { User } from '@prisma/client';

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: 'Tim Apple',
    email: 'tim@apple.com',
  },
] as Partial<User>[];

const loadServer = async (): Promise<void> => {
  await prisma.server.createMany({
    data: [
      { id: 401, name: 'Grandapan' },
      { id: 403, name: 'Oshimo' },
      { id: 404, name: 'Terra Cogita' },
      { id: 405, name: 'Herdegrize' },
      { id: 406, name: 'Dodge' },
      { id: 407, name: 'Brutas' },
    ],
  });
};

const seed = async (): Promise<void> => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
        })
      )
    );
    await loadServer();
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

void seed();

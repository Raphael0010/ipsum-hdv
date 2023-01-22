import { prisma } from '.';

import type { User } from '@prisma/client';

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: 'Tim Apple',
    email: 'tim@apple.com',
  },
] as Array<Partial<User>>;

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

  await prisma.itemSuperType.createMany({
    data: [
      { id: 1, name: 'Alchimistes' },
      { id: 2, name: 'Animaux' },
      { id: 3, name: 'Bijoutier' },
      { id: 4, name: 'Bouchers & Chasseurs' },
      { id: 5, name: 'Boulangers' },
      { id: 6, name: 'Bricoleurs' },
      { id: 7, name: 'Bûcheronss' },
      { id: 8, name: 'Cordonniers' },
      { id: 9, name: 'Documents' },
      { id: 10, name: 'Dofus & Trophées' },
      { id: 11, name: "Féé d'artifice" },
      { id: 12, name: 'Figurines' },
      { id: 13, name: 'Forgerons' },
      { id: 14, name: 'Milice' },
      { id: 15, name: 'Mineurs' },
      { id: 16, name: "Objets d'Apparats" },
      { id: 17, name: 'Paysans' },
      { id: 18, name: "Pierres d'âmes" },
      { id: 19, name: 'Poissonniers & pêcheurs' },
      { id: 20, name: 'Ressources' },
      { id: 21, name: 'Runes' },
      { id: 22, name: 'Sculpteurs' },
      { id: 23, name: 'Tailleurs' },
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

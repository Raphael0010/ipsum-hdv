import { NextApiHandler } from 'next';
import z from 'zod';
import { prisma } from '@ipsum-hdv/database';
// eslint-disable-next-line import/extensions
import { env } from '../../env/server.mjs';

const schema = z.object({
  password: z.string(),
  itemId: z.number(),
  itemName: z.string(),
  itemIconId: z.number(),
  typeId: z.number(),
  typeName: z.string(),
  serverId: z.number(),
  average: z.number(),
  x1: z.number(),
  x10: z.number(),
  x100: z.number(),
});

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = schema.parse(req.body);
      if (data.password !== env.API_PASSWORD) {
        return res.status(403).send({
          message: `Yo, bad password ☠️`,
        });
      }
      await prisma.price.create({
        data: {
          item: {
            connectOrCreate: {
              where: {
                id: data.itemId,
              },
              create: {
                id: data.itemId,
                name: data.itemName,
                iconId: data.itemIconId,
                itemType: {
                  connectOrCreate: {
                    where: {
                      id: data.typeId,
                    },
                    create: {
                      id: data.typeId,
                      name: data.typeName,
                    },
                  },
                },
              },
            },
          },
          server: {
            connect: {
              id: data.serverId,
            },
          },
          average: data.average,
          x1: data.x1,
          x10: data.x10,
          x100: data.x100,
        },
      });

      return res.status(200).send({
        message: `Catégorie: ${data.typeName} - Item : ${data.itemName} ajoutée 🫡`,
      });
    } catch (e) {
      return res.status(400).send({
        message: `Yo, bad payload`,
      });
    }
  }

  return res.status(410).send({
    message: 'Method not allowed',
  });
};

export default handler;

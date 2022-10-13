import { NextApiHandler } from 'next';
import { prisma } from '@ipsum-hdv/database';

const lessThanOneHourAgo = (date: Date): boolean => {
  const HOUR = 1000 * 60 * 60;
  const anHourAgo = Date.now() - HOUR;

  return date.getTime() > anHourAgo;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const val = await prisma.server.findMany({
        select: {
          id: true,
          prices: {
            select: {
              createdAt: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
      });

      const t = val.sort(
        (a, b) =>
          a.prices[0] &&
          a.prices[0].createdAt.getTime() - b.prices[0].createdAt.getTime()
      );

      const less = lessThanOneHourAgo(t[0].prices[0].createdAt);

      if (less) {
        return res.status(200).send({
          message: null,
        });
      }

      return res.status(200).send({
        message: t[0].id,
      });
    } catch (e) {
      return res.status(400).send({
        message: `Yo, somethings went wrong`,
      });
    }
  }

  return res.status(410).send({
    message: `Method not allowed ${req.method ?? ''}`,
  });
};

export default handler;

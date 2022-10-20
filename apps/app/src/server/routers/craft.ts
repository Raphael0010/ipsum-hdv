import { z } from 'zod';
import { EJob } from '../../utils/job';
import { t } from './trpc';
// eslint-disable-next-line import/extensions
import recipes from '../../utils/recipes.json';

export const craftRouter = t.router({
  craftOptimizer: t.procedure
    .input(
      z.object({
        nbCase: z.number(),
        job: z.nativeEnum(EJob),
        benefice: z.number(),
        serverId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { nbCase, job, benefice, serverId } = input;

      const allItems = await ctx.prisma.item.findMany({
        select: {
          id: true,
          name: true,
          iconId: true,
          prices: {
            select: {
              x1: true,
            },
            where: {
              serverId,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
      });

      // benefice 1 = ratio
      // benefice 2 = kamas

      const all: {
        id: number;
        name: string;
        iconId: number;
        profit: number;
      }[] = [];
      firstLoop: for (const a of allItems) {
        if (!a.prices[0] || a.prices[0].x1 === 0) {
          continue;
        }

        const item = recipes[a.id as unknown as keyof typeof recipes];
        let price = 0;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!item) {
          continue;
        }

        for (let index = 0; index < item.ingredientIds.length; index++) {
          if (nbCase !== -1) {
            if (item.ingredientIds.length !== nbCase) {
              continue firstLoop;
            }
          }

          if (job.valueOf() !== -1) {
            if (item.jobId !== job) {
              continue firstLoop;
            }
          }

          const ingredient = allItems.find(
            (e) => e.id === item.ingredientIds[index]
          );

          if (ingredient?.prices[0] && ingredient.prices[0].x1 !== 0) {
            price += item.quantities[index] * ingredient.prices[0].x1;
          } else {
            continue firstLoop;
          }
        }

        if (price === 0) {
          continue;
        }

        if (benefice === 2) {
          all.push({
            id: a.id,
            name: a.name,
            iconId: a.iconId,
            profit: a.prices[0].x1 - price,
          });
        } else {
          all.push({
            id: a.id,
            iconId: a.iconId,
            name: a.name,
            profit: a.prices[0].x1 / price,
          });
        }
      }

      return all.sort((a, b) => b.profit - a.profit);
    }),
});

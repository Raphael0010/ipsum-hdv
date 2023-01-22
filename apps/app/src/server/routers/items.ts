/* eslint-disable no-await-in-loop */
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { router, publicProcedure } from './trpc';
// eslint-disable-next-line import/extensions
import recipes from '../../utils/recipes.json';
import { EFilter } from '../../components/pages/itemType/ItemTypeContainer';

export const itemRouter = router({
  getMostProfitableItemToCraft: publicProcedure
    .input(z.object({ serverId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { serverId } = input;
      const allItems = await ctx.prisma.item.findMany({
        select: {
          id: true,
          name: true,
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
        /*where: {
          id: {
            in: Object.keys(data).map((e) => Number(e)),
          },
        },*/
      });
      let bestRatioNaked = 0;
      let bestRatioNakedItemId = 0;
      let bestRatioNakedName = '';

      let bestRatioPrice = 0;
      let bestRatioPriceId = 0;
      let bestRatioPriceName = '';

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

        const ratioNaked = a.prices[0].x1 / price;
        const ratioPrice = a.prices[0].x1 - price;

        if (ratioNaked > bestRatioNaked) {
          bestRatioNakedItemId = a.id;
          bestRatioNakedName = a.name;
          bestRatioNaked = ratioNaked;
        }

        if (ratioPrice > bestRatioPrice) {
          bestRatioPriceId = a.id;
          bestRatioPriceName = a.name;
          bestRatioPrice = ratioPrice;
        }
      }
      return {
        ratio: {
          id: bestRatioNakedItemId,
          name: bestRatioNakedName,
          ratio: bestRatioNaked,
        },
        price: {
          id: bestRatioPriceId,
          name: bestRatioPriceName,
          ratio: bestRatioPrice,
        },
      };
    }),

  getItemCraft: publicProcedure
    .input(z.object({ itemId: z.number(), serverId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { itemId, serverId } = input;
      const item = recipes[itemId as unknown as keyof typeof recipes];
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!item) {
        return null;
      }

      const itemsNeeded = await ctx.prisma.item.findMany({
        select: {
          id: true,
          name: true,
          iconId: true,
          prices: {
            select: {
              x1: true,
              average: true,
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
        where: {
          id: {
            in: [...item.ingredientIds, itemId],
          },
        },
      });

      const item_ = itemsNeeded.find((e) => e.id === itemId);
      if (!item_) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Item not found',
        });
      }

      if (item_.prices.length === 0) {
        return null;
      }

      const ingredients = item.ingredientIds.map((e, i) => {
        const ingredient = itemsNeeded.find((f) => f.id === e);

        if (!ingredient) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Ingredient not found',
          });
        }

        if (ingredient.prices.length === 0) {
          return {
            id: e,
            x1: 0,
            average: 0,
            name: ingredient.name,
            iconId: ingredient.iconId,
            quantity: item.quantities[i],
            total: 0,
            totalAvg: 0,
          };
        }

        const prix1 = ingredient.prices[0].x1;

        return {
          id: e,
          x1: prix1,
          average: ingredient.prices[0].average,
          name: ingredient.name,
          iconId: ingredient.iconId,
          quantity: item.quantities[i],
          total: prix1 * item.quantities[i],
          totalAvg: ingredient.prices[0].average * item.quantities[i],
        };
      });

      const total = ingredients.reduce((a, b) => a + b.total, 0);
      const totalAvg = ingredients.reduce((a, b) => a + b.totalAvg, 0);
      const profit = item_.prices[0].x1 - total;
      const profitAvg = item_.prices[0].average - totalAvg;
      const profitRatio = item_.prices[0].x1 / total;
      const profitRatioAvg = item_.prices[0].average / totalAvg;

      return {
        id: itemId,
        actualPrice: item_.prices[0].x1,
        ingredients,
        total,
        totalAvg,
        profit,
        profitAvg,
        profitRatio,
        profitRatioAvg,
      };
    }),

  byId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const item = await ctx.prisma.item
        .findUnique({
          where: { id },
        })
        .prices();

      if (!item) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No item with id '${id}'`,
        });
      }

      return {
        ...item,
      };
    }),

  byName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const { name } = input;
      return ctx.prisma.item
        .findFirst({
          where: { name },
        })
        .prices();
    }),

  byTypeIdSearch: publicProcedure
    .input(
      z.object({
        id: z.number(),
        search: z.string(),
        filter: z.nativeEnum(EFilter),
        serverId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id, search, filter, serverId } = input;

      if (filter === EFilter.profit || filter === EFilter.ratio) {
        const data = await ctx.prisma.item.findMany({
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
          where: {
            itemTypeId: id,
          },
        });

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
        const all: Array<{
          id: number;
          name: string;
          iconId: number;
          profit: number;
        }> = [];
        firstLoop: for (const a of data) {
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

          if (filter === EFilter.profit) {
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
      } else {
        if (search.length === 0) {
          return ctx.prisma.itemType
            .findUnique({
              where: { id },
            })
            .items();
        }

        return ctx.prisma.item.findMany({
          select: {
            id: true,
            name: true,
            iconId: true,
          },
          where: {
            itemTypeId: {
              equals: id,
            },
            name: {
              contains: search,
            },
          },
        });
      }
    }),

  allItemsByName: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(({ ctx, input }) => {
      const { search } = input;
      if (search.length === 0) {
        return [];
      }
      return ctx.prisma.item.findMany({
        select: {
          id: true,
          name: true,
          iconId: true,
        },
        where: {
          name: {
            contains: search,
          },
        },
      });
    }),

  pricesByItemId: publicProcedure
    .input(z.object({ id: z.number(), serverId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id, serverId } = input;
      const res = await ctx.prisma.item.findUnique({
        where: { id },
        select: {
          name: true,
          iconId: true,
          prices: {
            where: {
              serverId,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });
      if (!res) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No item with id '${id}'`,
        });
      }
      if (res.prices.length === 0) {
        return null;
      }
      return res;
    }),
  all: publicProcedure
    .input(z.object({ take: z.number(), skip: z.number() }))
    .query(async ({ ctx, input }) => {
      const { take, skip } = input;
      return ctx.prisma.item.findMany({
        take,
        skip,
        select: {
          id: true,
          name: true,
        },
      });
    }),

  typeNameAll: publicProcedure.input(z.object({})).query(async ({ ctx }) =>
    ctx.prisma.itemType.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    })
  ),

  getCategorieName: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.itemType.findUnique({
        select: {
          id: true,
          name: true,
        },
        where: {
          id,
        },
      });
    }),

  getServerName: publicProcedure
    .input(z.object({ serverId: z.number() }))
    .query(({ ctx, input }) => {
      const { serverId } = input;
      return ctx.prisma.server.findUnique({
        select: {
          id: true,
          name: true,
        },
        where: {
          id: serverId,
        },
      });
    }),

  superTypeSearch: publicProcedure
    .input(z.object({ search: z.string() }))
    .query(async ({ ctx, input }) => {
      const { search } = input;
      if (search.length === 0) {
        return ctx.prisma.itemSuperType.findMany({
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            name: 'asc',
          },
        });
      }

      return ctx.prisma.itemSuperType.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
        where: {
          name: {
            contains: search,
          },
        },
      });
    }),

  getItemTypeFromSuperType: publicProcedure
    .input(z.object({ superTypeId: z.number(), search: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { superTypeId, search } = input;

      let res: Array<{
        id: number;
        name: string;
      }> = [];

      if (search && search.length !== 0) {
        res = await ctx.prisma.itemType.findMany({
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            name: 'asc',
          },
          where: {
            superTypeId,
            name: {
              contains: search,
            },
          },
        });
      } else {
        res = await ctx.prisma.itemType.findMany({
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            name: 'asc',
          },
          where: {
            superTypeId,
          },
        });
      }

      const final: Array<{
        id: number;
        name: string;
        image: number | undefined;
      }> = [];

      for (const r of res) {
        const p = {
          id: r.id,
          name: r.name,

          image: (
            await ctx.prisma.item.findFirst({
              select: {
                iconId: true,
              },
              where: {
                itemTypeId: r.id,
              },
            })
          )?.iconId,
        };

        final.push(p);
      }

      return final;
    }),

  getSuperType: publicProcedure
    .input(z.object({ superTypeId: z.number() }))
    .query(({ ctx, input }) => {
      const { superTypeId } = input;

      return ctx.prisma.itemSuperType.findUnique({
        select: {
          id: true,
          name: true,
        },
        where: {
          id: superTypeId,
        },
      });
    }),

  getRandomItemFromType: publicProcedure
    .input(z.object({ typeId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { typeId } = input;

      const res = await ctx.prisma.item.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          itemTypeId: typeId,
        },
      });

      return res[Math.floor(Math.random() * res.length)];
    }),

  getServerAndUpdate: publicProcedure
    .input(z.object({}))
    .query(async ({ ctx }) =>
      ctx.prisma.server.findMany({
        select: {
          id: true,
          name: true,
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
      })
    ),

  getStats: publicProcedure.input(z.object({})).query(async ({ ctx }) => {
    const allPriceCount = await ctx.prisma.price.count({});
    const allItemCount = await ctx.prisma.item.count({});
    const lastUpdate = await ctx.prisma.price.findFirst({
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 1,
    });

    return {
      allPriceCount,
      allItemCount,
      lastUpdate,
    };
  }),
});

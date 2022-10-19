import { routes } from '@pikas-utils/router';

export const { getLink } = routes({
  origin: 'http://localhost:3000',
  links: {
    home: '/',
    craft: '/craft',
    statsChoose: '/stats/choose',
    statsGlobal: '/stats/global',
    statsServer: '/stats/:serverId',
    almanax: '/almanax',
    superType: '/superType/:superTypeId',
    itemType: '/itemType/:itemTypeId',
    item: '/item/:itemId',
  },
});

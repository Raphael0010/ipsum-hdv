import { routes } from '@pikas-utils/router';

export const { getLink } = routes({
  origin: 'http://localhost:3000',
  links: {
    home: '/',
    craft: '/craft',
    stats: '/stats',
    almanax: '/almanax',
    superType: '/superType/:superTypeId',
    itemType: '/itemType/:itemTypeId',
    item: '/item/:itemId',
  },
});

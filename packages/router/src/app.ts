import { routes } from '@pikas-utils/router';

export const { getLink } = routes({
  origin: 'http://localhost:3000',
  links: {
    home: '/',
    itemType: '/itemType/:itemTypeId',
    item: '/item/:itemId',
  },
});

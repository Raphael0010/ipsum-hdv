export const getServerName = (id: number): string => {
  switch (id) {
    case 401:
      return 'Grandapan';
    case 403:
      return 'Oshimo';
    case 404:
      return 'Terra Cogita';
    case 405:
      return 'Herdegrize';
    case 406:
      return 'Dodge';
    case 407:
      return 'Brutas';
    default:
      return 'Grandapan';
  }
};

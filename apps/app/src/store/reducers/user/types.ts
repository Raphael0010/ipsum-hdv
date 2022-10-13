import type { Session } from 'next-auth';

export type Server = 401 | 403 | 404 | 405 | 406 | 407;
export type UserState = {
  me: Session['user'] | null;
  serverId: Server;
};

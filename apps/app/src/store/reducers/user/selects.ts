import type { Session } from 'next-auth';
import type { RootState } from '../../store';
import { Server } from './types';

export const selectMe = (state: RootState): Session['user'] | null =>
  state.user.me;

export const selectServerId = (state: RootState): Server => state.user.serverId;

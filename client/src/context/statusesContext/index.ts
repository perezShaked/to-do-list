import { createContext } from 'react';
import { Statuses } from '../../../../client/src/types';

export const statusesContext = createContext<Statuses | undefined>(undefined);

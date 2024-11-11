import { createContext } from 'react';
import { Statuses } from '../../types';

export const statusesContext = createContext<Statuses | undefined>(undefined);

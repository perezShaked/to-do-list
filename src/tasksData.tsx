
type statusOptions = 'wait' | 'pendingUpdate' | 'completed' | 'canceled' | 'inProgress';

export type Task = {
  id: number,
  isMarked: boolean,
  title: string,
  dueDate: string | undefined,
  madeBy: string,
  owner: string,
  status: statusOptions,
  subTasks: Task[]
}

export const tasks: Task[] = [
  {
    id: 0,
    isMarked: false,
    title: '',
    dueDate: undefined,
    madeBy: '',
    owner: '',
    status: 'pendingUpdate',
    subTasks: [] },
  {
    id: 1,
    isMarked: false,
    title: '',
    dueDate: undefined,
    madeBy: '',
    owner: '',
    status: 'pendingUpdate',
    subTasks: [] }
];



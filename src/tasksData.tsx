
export type statusOptions = 'wait' | 'pendingUpdate' | 'completed' | 'canceled' | 'inProgress';

export type Task = {
  id: number,
  isMarked: boolean,
  title: string,
  dueDate: string | undefined,
  madeBy: string,
  owner: string,
  status: statusOptions,
  subTasks: SubTask[]
  showSubTasks: boolean
}

export type SubTask = {
  id: number,
  title: string,
  status: statusOptions,
}

export const tasks: Task[] = [
  {
    id: 0,
    isMarked: false,
    title: 'כל מיני דברים',
    dueDate: '2024-12-22',
    madeBy: 'שקד',
    owner: 'שקד',
    status: 'pendingUpdate',
    subTasks: [],
    showSubTasks: false },
  {
    id: 1,
    isMarked: false,
    title: 'חשוב ממש ממש',
    dueDate: undefined,
    madeBy: 'שקד',
    owner: 'שקד',
    status: "canceled",
    subTasks: [
      {
        id: 1,
        title: 'כותרת ופירוט וכל מיני דברים',
        status: 'wait'},
      {
        id: 1,
        title: 'בקבוק',
        status: 'inProgress'}
    ],
    showSubTasks: false }
];



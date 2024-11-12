export enum StatusOptions {
  WAIT = 1,
  PENDING_UPDATE = 2,
  COMPLETED = 3,
  CANCELED = 4,
  IN_PROGRESS = 5,
  ALL_STATUSES = 6,
}

export type Statuses = {
  [key: number]: {
    hebrew_name: string;
    color: string;
  };
};

export type Task = {
  id: number;
  title: string;
  dueDate: Date;
  madeBy: string;
  owner: string;
  status: StatusOptions;
  subTasks: SubTask[];
};

export type newTask = {
  taskId: number;
  dueDate: string;
  madeBy: string;
  owner: string;
  statusId: number;
  title: string;
};

export type SubTask = {
  id: number;
  title: string;
  status: StatusOptions;
};

export enum TasksTypes {
  TASK = 'task',
  SUB_TASK = 'subTask',
}

export type CheckedTask = {
  id: number;
  type: TasksTypes;
  parentId: number;
};

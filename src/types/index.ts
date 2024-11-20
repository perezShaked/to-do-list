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
  taskId: number;
  dueDate: string;
  madeBy: string;
  owner: string;
  statusId: number;
  title: string;
  subTasks: SubTask[];
};

export type SubTask = {
  subTaskId: number;
  statusId: number;
  title: string;
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

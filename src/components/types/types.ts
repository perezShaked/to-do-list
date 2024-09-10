export enum StatusOptions {
  WAIT = "wait",
  COMPLETED = "completed",
  PENDING_UPDATE = "pendingUpdate",
  CANCELED = "canceled",
  IN_PROGRESS = "inProgress",
  ALL_STATUSES = "allStatuses",
}

export type Task = {
  id: number;
  title: string;
  dueDate: Date;
  madeBy: string;
  owner: string;
  status: StatusOptions;
  subTasks: SubTask[];
};

export type SubTask = {
  id: number;
  title: string;
  status: StatusOptions;
};

export type TasksTypes =  "task" | "subTask";

export type CheckedTask = {
  id: number;
  type: TasksTypes;
  parentId: number;
};

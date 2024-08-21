export type statusOptions =
  | "wait"
  | "pendingUpdate"
  | "completed"
  | "canceled"
  | "inProgress";

export type Task = {
  id: number;
  title: string;
  dueDate: Date;
  madeBy: string;
  owner: string;
  status: statusOptions;
  subTasks: SubTask[];
};

export type SubTask = {
  id: number;
  title: string;
  status: statusOptions;
};

export const tasks: Task[] = [
  {
    id: 0,
    title: "כל מיני דברים",
    dueDate: new Date(),
    madeBy: "שקד",
    owner: "שקד",
    status: "pendingUpdate",
    subTasks: [],
  },
  {
    id: 1,
    title: "חשוב ממש ממש",
    dueDate: new Date(),
    madeBy: "שקד",
    owner: "שקד",
    status: "canceled",
    subTasks: [
      {
        id: 1,
        title: "כותרת ופירוט וכל מיני דברים",
        status: "wait",
      },
      {
        id: 2,
        title: "בקבוק",
        status: "inProgress",
      },
    ],
  },
];

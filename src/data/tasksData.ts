import { Task, StatusOptions } from "../types";

export const tasksData: Task[] = [
  {
    id: 0,
    title: "כל מיני דברים",
    dueDate: new Date(),
    madeBy: "שקד",
    owner: "שקד",
    status: StatusOptions.PENDING_UPDATE,
    subTasks: [],
  },
  {
    id: 1,
    title: "חשוב ממש ממש ועוד כל מיני דברים",
    dueDate: new Date(),
    madeBy: "שקד",
    owner: "שקד",
    status: StatusOptions.CANCELED,
    subTasks: [
      {
        id: 0,
        title: "כותרת ופירוט וכל מיני דברים",
        status: StatusOptions.WAIT,
      },
      {
        id: 1,
        title: "בקבוק",
        status: StatusOptions.IN_PROGRESS,
      },
    ],
  },
  {
    id: 2,
    title: "כל מיני דברים",
    dueDate: new Date(),
    madeBy: "שקד",
    owner: "שקד",
    status: StatusOptions.PENDING_UPDATE,
    subTasks: [],
  },
  {
    id: 3,
    title: "חשוב ממש ממש",
    dueDate: new Date(),
    madeBy: "שקד",
    owner: "שקד",
    status: StatusOptions.CANCELED,
    subTasks: [
      {
        id: 0,
        title: "כותרת ופירוט וכל מיני דברים",
        status: StatusOptions.WAIT,
      },
      {
        id: 1,
        title: "בקבוק",
        status: StatusOptions.IN_PROGRESS,
      },
    ],
  },
];

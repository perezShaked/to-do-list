export type statusOptions =
  | "wait"
  | "pendingUpdate"
  | "completed"
  | "canceled"
  | "inProgress"
  | "allStatuses";

export const statuses = new Map<string, { hebrewName: string; color: string }>([
  ["wait", { hebrewName: "מחכה", color: "#2999ED" }],
  ["pendingUpdate", { hebrewName: "ממתין לעדכון", color: "#929292" }],
  ["completed", { hebrewName: "בוצע", color: "#2D8B00" }],
  ["canceled", { hebrewName: "בוטל", color: "#F85359" }],
  ["inProgress", { hebrewName: "בעבודה", color: "#F0AD00" }],
  ["allStatuses", { hebrewName: "כל הסטטוסים", color: "#FFFFFF" }],
]);

export type Task = {
  id: number;
  title: string;
  dueDate: Date;
  madeBy: string;
  owner: string;
  status: statusOptions;
  subTasks: SubTaskType[];
};

export type SubTaskType = {
  id: number;
  title: string;
  status: statusOptions;
};

export type checkedTasks = {
  id: number;
  type: "task" | "subTask";
  parentId: number;
};

export let tasksData: Task[] = [
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
        id: 0,
        title: "כותרת ופירוט וכל מיני דברים",
        status: "wait",
      },
      {
        id: 1,
        title: "בקבוק",
        status: "inProgress",
      },
    ],
  },
  {
    id: 2,
    title: "כל מיני דברים",
    dueDate: new Date(),
    madeBy: "שקד",
    owner: "שקד",
    status: "pendingUpdate",
    subTasks: [],
  },
  {
    id: 3,
    title: "חשוב ממש ממש",
    dueDate: new Date(),
    madeBy: "שקד",
    owner: "שקד",
    status: "canceled",
    subTasks: [
      {
        id: 0,
        title: "כותרת ופירוט וכל מיני דברים",
        status: "wait",
      },
      {
        id: 1,
        title: "בקבוק",
        status: "inProgress",
      },
    ],
  },
];

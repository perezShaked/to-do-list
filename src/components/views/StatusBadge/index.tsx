import "./TaskStatusBadge.css";
import { StatusOptions } from "../../../types";
import { statuses } from "../../../data";
import clsx from "clsx";

type StatusProps = {
  status: StatusOptions;
  onClick?: () => void;
};

export const StatusBadge = ({ status, onClick }: StatusProps) => {
  return (
    <button
      className={clsx("status", status)}
      onClick={onClick}
      style={{ backgroundColor: statuses[status].color }}
    >
      {statuses[status].hebrewName}
    </button>
  );
};

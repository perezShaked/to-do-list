import { useEffect, useRef, useState } from "react";
import "./TaskStatusChanger.css";
import { ArrowIcon } from "../../../../elements/ArrowIcon";
import { statusOptions } from "../../../../types/tasksData";
import { StatusSelector } from "../../../StatusSelector";
import { StatusBadge } from "../../../StatusBadge";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";

type StatusProps = {
  status: statusOptions;
  onClick: (status: statusOptions) => () => void;
};

export const TaskStatusChanger = ({ status, onClick }: StatusProps) => {
  const [isStatusSelectorOpen, setIsStatusSelectorOpen] = useState(false);
  const statusSelectorRef = useRef<HTMLDivElement>(null);

  const openStatusSelector = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsStatusSelectorOpen(!isStatusSelectorOpen);
  };

  useOutsideClick(statusSelectorRef, () => setIsStatusSelectorOpen(false));

  useEffect(() => {
    setIsStatusSelectorOpen(false);
  }, [status]);

  return (
    <div ref={statusSelectorRef} className="statusChanger">
      <div className="statusContainer" onClick={openStatusSelector}>
        <StatusBadge status={status} />
        <ArrowIcon
          className="statusArrow"
          direction={isStatusSelectorOpen ? "up" : "down"}
        />
      </div>
      {isStatusSelectorOpen && (
        <div className="statusSelector">
          <StatusSelector onClick={onClick} className="TaskStatusSelector" />
        </div>
      )}
    </div>
  );
};

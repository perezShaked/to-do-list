import { useEffect, useRef, useState } from "react";
import "./TaskStatusChanger.css";
import { ArrowIcon } from "../../../../elements/ArrowIcon";
import { StatusOptions } from "../../../../../types";
import { StatusSelector } from "../../../StatusSelector";
import { StatusBadge } from "../../../StatusBadge";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";

type StatusProps = {
  status: StatusOptions;
  onClick: (status: StatusOptions) => () => void;
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
      <div className="statusContainer">
        <div className="statusBadgeContainer" onClick={openStatusSelector}>
          <StatusBadge status={status} />
          <ArrowIcon className="statusArrow" direction={isStatusSelectorOpen ? "up" : "down"} />
        </div>
        {isStatusSelectorOpen && (
          <div className="statusChangerSelector">
            <StatusSelector onClick={onClick} className="taskStatusSelector" />
          </div>
        )}
      </div>
    </div>
  );
};

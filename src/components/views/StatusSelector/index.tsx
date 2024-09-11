import { StatusOptions } from "../../../types";
import { StatusBadge } from "../StatusBadge";
import "./TaskStatusSelector.css";

type StatusSelectorProps = {
  className: string;
  onClick: (status: StatusOptions) => () => void;
};

export const StatusSelector = ({ className, onClick }: StatusSelectorProps) => {
  return (
    <div className={className}>
      <StatusBadge status={StatusOptions.COMPLETED} onClick={onClick(StatusOptions.COMPLETED)} />
      <StatusBadge status={StatusOptions.CANCELED} onClick={onClick(StatusOptions.CANCELED)} />
      <StatusBadge
        status={StatusOptions.IN_PROGRESS}
        onClick={onClick(StatusOptions.IN_PROGRESS)}
      />
      <StatusBadge status={StatusOptions.WAIT} onClick={onClick(StatusOptions.WAIT)} />
      <StatusBadge
        status={StatusOptions.PENDING_UPDATE}
        onClick={onClick(StatusOptions.PENDING_UPDATE)}
      />
      {className === "sortStatusSelector" && (
        <StatusBadge
          status={StatusOptions.ALL_STATUSES}
          onClick={onClick(StatusOptions.ALL_STATUSES)}
        />
      )}
    </div>
  );
};

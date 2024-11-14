import { StatusOptions } from '../../../types';
import { StatusBadge } from '../StatusBadge';
import './TaskStatusSelector.css';

type StatusSelectorProps = {
  className: string;
  onClick: (status: number) => () => void;
};

export const 
StatusSelector = ({ className, onClick }: StatusSelectorProps) => {
  return (
    <div className={className}>
      <StatusBadge statusId={StatusOptions.COMPLETED} onClick={onClick(StatusOptions.COMPLETED)} />
      <StatusBadge statusId={StatusOptions.CANCELED} onClick={onClick(StatusOptions.CANCELED)} />
      <StatusBadge
        statusId={StatusOptions.IN_PROGRESS}
        onClick={onClick(StatusOptions.IN_PROGRESS)}
      />
      <StatusBadge statusId={StatusOptions.WAIT} onClick={onClick(StatusOptions.WAIT)} />
      <StatusBadge
        statusId={StatusOptions.PENDING_UPDATE}
        onClick={onClick(StatusOptions.PENDING_UPDATE)}
      />
      {className === 'sortStatusSelector' && (
        <StatusBadge
          statusId={StatusOptions.ALL_STATUSES}
          onClick={onClick(StatusOptions.ALL_STATUSES)}
        />
      )}
    </div>
  );
};

import "./SortButton.css";
import { useRef, useState, useEffect } from "react";
import { ArrowIcon } from "../../../elements/ArrowIcon";
import { StatusSelector } from "../../StatusSelector";
import { StatusOptions } from "../../../../types";
import { statuses } from "../../../../data";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

type sortButtonProps = {
  onClick: (sortStatus: StatusOptions) => () => void;
  sortStatus: StatusOptions;
};

export const SortButton = ({ onClick, sortStatus }: sortButtonProps) => {
  const [isStatusSelectorOpen, setIsStatusSelectorOpen] = useState(false);
  const statusSelectorRef = useRef<HTMLDivElement>(null);

  useOutsideClick(statusSelectorRef, () => setIsStatusSelectorOpen(false));

  const onSortButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsStatusSelectorOpen(!isStatusSelectorOpen);
  };

  useEffect(() => {
    setIsStatusSelectorOpen(false);
  }, [sortStatus]);

  return (
    <div ref={statusSelectorRef} className="sortChanger">
      <button className="sortButton" onClick={onSortButtonClick}>
        {statuses[sortStatus].hebrewName}
        <ArrowIcon className="sortButtonArrow" direction={isStatusSelectorOpen ? "up" : "down"} />
      </button>
      {isStatusSelectorOpen && (
        <div className="sortSelector">
          <StatusSelector onClick={onClick} className="sortStatusSelector" />
        </div>
      )}
    </div>
  );
};

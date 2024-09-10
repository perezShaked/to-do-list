import { useEffect, MutableRefObject } from "react";

export const useOutsideClick = (ref: MutableRefObject<HTMLElement | null>, handler: () => void) => {
  const handleClickOutside = ({ target }: MouseEvent) => {
    if (ref.current && !ref.current.contains(target as Node)) {
      handler();
    }
  };

  useEffect(() => {
    if (ref) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [ref]);
};

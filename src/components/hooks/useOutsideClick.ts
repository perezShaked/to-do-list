import { useEffect, MutableRefObject } from "react";

export const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: () => void
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
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

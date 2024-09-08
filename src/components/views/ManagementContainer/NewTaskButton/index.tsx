import "./NewTaskButton.css";

export const NewTaskButton = ({
  onClick,
  disabled,
  ...rest
}: React.ComponentProps<"button">) => {
  return (
    <button
      {...rest}
      className="newTaskButton"
      disabled={disabled}
      onClick={onClick}
    >
      + משימה חדשה
    </button>
  );
};

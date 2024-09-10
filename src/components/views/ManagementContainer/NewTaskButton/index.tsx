import "./NewTaskButton.css";

export const NewTaskButton = ({ onClick, disabled }: React.ComponentProps<"button">) => {
  return (
    <button className="newTaskButton" disabled={disabled} onClick={onClick}>
      + משימה חדשה
    </button>
  );
};

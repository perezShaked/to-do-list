import './NewTaskButton.css';


export const NewTaskButton = ({onClick, disabled, ...rest}:React.ComponentProps<'button'>) => {  
  return(
      <button className="newTaskButton" disabled={disabled} {...rest} onClick={onClick}>+ משימה חדשה</button>
  )
}


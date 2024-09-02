import './NewTaskButton.css';


export const NewTaskButton = ({onClick, ...rest}:React.ComponentProps<'button'>) => {  
  return(
      <button className="newTaskButton" {...rest} onClick={onClick}>+ משימה חדשה</button>
  )
}


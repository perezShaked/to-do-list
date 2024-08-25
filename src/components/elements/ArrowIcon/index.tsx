import './ArrowIcon.css'

type ArrowIconProps = {
  className: string,
  direction: 'down' | 'left' | 'up'
  onClick?: () => void
}


export const ArrowIcon = ({direction, className, onClick}: ArrowIconProps) =>{
  return(
    <svg className={`${direction}ArrowIcon ${className}`} onClick={onClick} xmlns="http://www.w3.org/2000/svg">
      <path d="M11.1519 16.0396L12.0003 16.888L18.7887 10.0996L17.0919 8.40283L12.0003 13.4932L6.90871 8.40283L5.21191 10.0996L11.1519 16.0396Z"/>
    </svg>
  )
}